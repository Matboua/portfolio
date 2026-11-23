import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenerativeAI, GoogleGenerativeAIAbortError, GoogleGenerativeAIFetchError } from '@google/generative-ai';
import { portfolioChatInstructions } from '../src/data/portfolioChat';

const languages = { de: 'German', en: 'English', fr: 'French' };
const maxBodyBytes = 96 * 1024;
const maxMessageLength = 2000;

interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false;
  const { role, parts } = value as Partial<ChatMessage>;
  return (role === 'user' || role === 'model') && Array.isArray(parts) &&
    parts.length === 1 && typeof parts[0]?.text === 'string' &&
    parts[0].text.trim().length > 0 && parts[0].text.length <= maxMessageLength;
}

async function readPayload(request: IncomingMessage & { body?: unknown }) {
  if (request.body !== undefined) return request.body;

  let body = '';
  request.setEncoding('utf8');
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > maxBodyBytes) throw new Error('Request body too large');
  }
  return JSON.parse(body) as unknown;
}

export function createChatHandler(getApiKey: () => string | undefined) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    const send = (status: number, data: { text: string } | { error: string }) => {
      response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify(data));
    };

    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return send(405, { error: 'Method not allowed' });
    }

    if (!request.headers['content-type']?.startsWith('application/json')) {
      return send(415, { error: 'Expected application/json' });
    }

    if (Number(request.headers['content-length']) > maxBodyBytes) {
      return send(413, { error: 'Request body too large' });
    }

    let payload: unknown;
    try {
      payload = await readPayload(request);
    } catch {
      return send(400, { error: 'Invalid request body' });
    }
    if (typeof payload !== 'object' || payload === null) {
      return send(400, { error: 'Invalid chat request' });
    }

    const { messages, language } = payload as { messages?: unknown; language?: unknown };
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 13 ||
        !messages.every(isChatMessage) || messages[0].role !== 'user' || messages.at(-1)?.role !== 'user' ||
        (language !== 'de' && language !== 'en' && language !== 'fr')) {
      return send(400, { error: 'Invalid chat request' });
    }

    const key = getApiKey()?.trim();
    if (!key) return send(503, { error: 'Chat is not configured' });

    const gemini = new GoogleGenerativeAI(key);
    const model = gemini.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      systemInstruction: `${portfolioChatInstructions}\nReply in ${languages[language]} unless the visitor requests another language.`,
      generationConfig: { maxOutputTokens: 512 },
    }, { timeout: 12000 });

    for (const attempt of [1, 2]) {
      try {
        const chat = model.startChat({ history: messages.slice(0, -1) });
        const result = await chat.sendMessage(messages[messages.length - 1].parts[0].text);
        const text = result.response.text().trim();
        if (!text) return send(502, { error: 'Chat returned an empty response' });
        return send(200, { text });
      } catch (error) {
        const providerStatus = error instanceof GoogleGenerativeAIFetchError ? error.status : undefined;
        const timedOut = error instanceof GoogleGenerativeAIAbortError;
        console.warn('[portfolio chat] Gemini request failed', {
          attempt,
          providerStatus,
          errorType: error instanceof Error ? error.name : 'UnknownError',
        });

        if (attempt === 1 && (timedOut || (providerStatus !== undefined && providerStatus >= 500))) {
          continue;
        }
        if (providerStatus === 429) return send(429, { error: 'Chat is temporarily rate limited' });
        if (timedOut) return send(504, { error: 'Chat provider timed out' });
        if (providerStatus === 401 || providerStatus === 403 || providerStatus === 404) {
          return send(503, { error: 'Chat provider is unavailable' });
        }
        return send(502, { error: 'Chat provider request failed' });
      }
    }
  };
}

export default createChatHandler(() => process.env.GEMINI_API_KEY);
