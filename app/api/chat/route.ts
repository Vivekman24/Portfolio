import { NextRequest, NextResponse } from 'next/server';
import { chatRequestSchema } from '@/lib/chat-core';
import { getChatAnswer } from '@/lib/chat-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Best-effort limits per server instance; a distributed limiter can replace this for larger deployments.
const visitors = new Map<string, { started: number; count: number; pending: number }>();
const MAX_BODY_BYTES = 100000;

async function boundedBody(request: NextRequest) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing body');
  let size = 0;
  const decoder = new TextDecoder();
  let body = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new Error('Too large'); }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function POST(request: NextRequest) {
  const json = (value: unknown, status = 200, extraHeaders: Record<string,string> = {}) => NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store', ...extraHeaders } });
  let input: ReturnType<typeof chatRequestSchema.parse>;
  try {
    const parsed = chatRequestSchema.safeParse(await boundedBody(request));
    if (!parsed.success) return json({ error: 'Send a question between 1 and 1,200 characters with a valid conversation history.' }, 400);
    input = parsed.data;
  } catch { return json({ error: 'The request is invalid or too large. Please send a shorter question.' }, 400); }
  const now = Date.now();
  for (const [key, visitor] of Array.from(visitors.entries())) if (now - visitor.started > 60000 && visitor.pending === 0) visitors.delete(key);
  const key = request.headers.get('x-forwarded-for')?.split(',')[0].trim().slice(0,100) || 'local';
  const visitor = visitors.get(key) ?? { started: now, count: 0, pending: 0 };
  if (now - visitor.started > 60000) { visitor.started = now; visitor.count = 0; }
  if (visitor.count >= 20 || visitor.pending >= 2 || (visitors.size >= 5000 && !visitors.has(key))) return json({ error: 'Please wait a moment before sending another question.' }, 429, { 'Retry-After': '60' });
  visitor.count++; visitor.pending++; visitors.set(key, visitor);
  try {
    const answer = await getChatAnswer(input.message, input.history, { config: { geminiKey: process.env.GOOGLEGEMINI_API_KEY || process.env.GEMINI_API_KEY, openAIKey: process.env.OPENAI_API_KEY, geminiModel: process.env.GEMINI_MODEL, openAIModel: process.env.OPENAI_MODEL }, signal: request.signal });
    return json(answer);
  } catch { return json({ error: 'The assistant couldn’t complete that request. Please try again.' }, 503); }
  finally { visitor.pending--; }
}
