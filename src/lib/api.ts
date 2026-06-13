const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53amhmandhcnhnd3Z4aXFyZHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMTU0MjIsImV4cCI6MjA5Njg5MTQyMn0.4ZmW6nzw05nXxSi6vyw--f_8mxUCDSxFtzBzdcackQc';

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
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(payload),
    signal,
  });

  return response.json() as Promise<ChatResponse>;
}
