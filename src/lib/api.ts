const API_BASE = '/api';

interface ChatRequest {
  message: string;
  session_id: string;
  language: string;
}

interface ChatResponse {
  status: 'ok' | 'error' | 'rate_limited';
  data?: {
    reply: string;
    language: string;
  };
  message?: string;
  retry_after?: number;
}

export async function sendChatMessage(
  payload: ChatRequest,
  signal?: AbortSignal
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  return response.json() as Promise<ChatResponse>;
}
