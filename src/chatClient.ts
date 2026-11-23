import type { Language } from './hooks/useLanguage';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export class PortfolioChatError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Portfolio chat request failed (HTTP ${status})`);
    this.status = status;
  }
}

export async function askPortfolioChat(messages: ChatMessage[], language: Language) {
  const recent = messages.slice(-13);
  const firstUser = recent.findIndex(({ role }) => role === 'user');
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: recent.slice(firstUser).map(({ role, parts }) => ({
        role,
        parts: [{ text: parts[0].text.slice(0, 2000) }],
      })),
      language,
    }),
  });

  if (!response.ok) throw new PortfolioChatError(response.status);

  const data = await response.json() as { text: string };
  return data.text;
}
