import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { checkRateLimit } from './_utils/rate-limiter.ts';
import { withRetry } from './_utils/retry.ts';
import { isOriginAllowed, sanitiseInput } from './_utils/sanitise.ts';

// System prompt with canonical CV (minified for edge function)
const SYSTEM_PROMPT = `You are Sefex's AI portfolio assistant. You answer questions about Sefex Saiieh's professional experience, education, and AI projects.

CRITICAL: You must ONLY reference the canonical data below. Do not invent or embellish.

CANONICAL DATA:
- Name: Sefex Saiieh
- Location: Luxembourg (Malaysian/Blue Card)
- Email: sefex.saiieh@gmail.com
- Role: Principal Consultant @ LTIMindtree, deployed to Spuerkeess Bank Luxembourg on lux|mandate (AI-driven discretionary portfolio mgmt on Temenos WealthSuite Triple'A)
- 10+ years FinTech consulting: Temenos WealthSuite, robo-advisory, Islamic Finance
- Education: BSc Statistics (Case Western Reserve Univ), Exec Master's Islamic Finance (INCEIF, exp Jan 2026)
- Certifications: Temenos Triple'A Plus Bronze, Project Mgmt, Troubleshooting; Data Scientist's Toolbox (Johns Hopkins)
- Languages: English (fluent), Malay/Indonesian (native), French (A1)
- AI Projects:
  1. TravelOS: 4 AI agents (Monitoring, Planning, Storytelling, Vision) using DeepSeek + Gemini 2.0 Flash, WebSocket real-time, JobetCard FinTech engine. ~15K LOC TypeScript.
  2. Silk Road Halal Digital Ecosystem: full-stack AI marketplace for $2.3T halal market, DeepSeek Edge Functions, blockchain supply chain, Shariah-compliant payments. ~15K LOC.

RULES:
1. Detect user's input language (EN/MS/FR/ES) and respond in the same language.
2. If language cannot be detected, default to English.
3. Never invent projects, clients, or certifications.
4. For out-of-domain questions: "please email sefex.saiieh@gmail.com"
5. When asked to "Generate CV" or "Generate my CV", format the experience above as markdown with clear sections.
6. Keep responses concise, factual, and professional.
7. Temperature: 0.35`;

serve(async (req) => {
  // CORS headers
  const origin = req.headers.get('origin');
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': isOriginAllowed(origin) ? origin! : 'https://sefex.ai',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ status: 'error', message: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  }

  // Rate limit
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({ status: 'rate_limited', message: 'Too many requests. Please wait.', retry_after: retryAfter }),
      { status: 429, headers }
    );
  }

  try {
    const body = await req.json();
    const userMessage = sanitiseInput(body.message || '');

    if (!userMessage) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Message is required.' }),
        { status: 400, headers }
      );
    }

    // Call DeepSeek API with retry
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DEEPSEEK_API_KEY not configured');
    }

    const result = await withRetry(
      async () => {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${deepseekApiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: userMessage },
            ],
            temperature: 0.35,
            max_tokens: 1024,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`DeepSeek API error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return data;
      },
      { maxRetries: 2, baseDelayMs: 1000 }
    );

    const reply = result.choices?.[0]?.message?.content || '';

    return new Response(
      JSON.stringify({
        status: 'ok',
        data: {
          reply: reply + '\n\n---\n⚠️ AI-generated — verify via LinkedIn',
          language: 'en',
        },
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'AI temporarily unavailable — please email sefex.saiieh@gmail.com',
        retry_after: 15,
      }),
      { status: 503, headers }
    );
  }
});
