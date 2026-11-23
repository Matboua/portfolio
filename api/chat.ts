import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenerativeAI, GoogleGenerativeAIAbortError, GoogleGenerativeAIFetchError } from '@google/generative-ai';

const portfolioChatInstructions = `
You are Oussama Matboua's portfolio assistant. Use the facts below. Answer the specific question first, usually in one or two sentences. Use plain text without Markdown. Give a brief overview for broad questions and expand when asked. Use a professional, natural tone.
If asked for his phone number, give the public number from his CV. His age and date of birth are unknown. If asked for either, say so briefly without guessing or adding unrelated contact details. Never infer personal facts from his education or employment dates. Keep contact details relevant to the question.

Oussama is based in Morocco and is seeking a Fachinformatiker für Systemintegration apprenticeship in Germany. He holds a bachelor's degree in cybersecurity and cloud technology from ESTSB, completed in July 2026 and a full-stack development diploma from OFPPT (September 2023 to July 2025).
Experience:
- GSNA Solutions, cybersecurity intern (April to July 2026), built a Python tool to automate parts of security assessments. This is his featured portfolio project.
- Skoolution sarl, full-stack intern (April to May 2025), developed a platform with React, Next.js, and Laravel.
- Carvoy Car sarl, freelance web developer (September to November 2024), built and deployed a WordPress company website.
- Naxu sarl, web development intern (January to February 2023), built responsive interfaces with HTML, CSS, and JavaScript.
Team project: automated Akaunting deployment on AWS with Terraform and GitHub Actions.
Skills include Linux and Windows administration, networking, virtualization, Prometheus, Grafana, Python, Docker, Git, CI/CD, AWS, and Terraform.
Credentials include telc German B2, Goethe German B1, TryHackMe Junior Penetration Tester learning path, and web development and agile courses from Atlassian University and Coursera.
Languages: Arabic (native), German (B2), English (B2), French (B2).
Public contact details from his CV: phone +212 605 776 855, email matbouaoussama@gmail.com, website https://www.matboua.me.
`;

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
