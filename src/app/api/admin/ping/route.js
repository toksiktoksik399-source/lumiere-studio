import { isSanityConfigured } from '@/sanity/lib/adminClient';

export async function GET() {
  // Just check if env vars are set — don't make a Sanity request
  // (new projects have empty datasets that can throw on first query)
  const configured = isSanityConfigured();
  return Response.json({ ok: configured });
}
