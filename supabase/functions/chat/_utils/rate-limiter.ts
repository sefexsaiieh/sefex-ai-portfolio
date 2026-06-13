// Rate limiter: in-memory IP-based (10 requests / minute)
const rateMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}
