import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';

export async function GET() {
  const configured = isSanityConfigured();
  if (!configured) {
    return Response.json({ ok: false, reason: 'no_token' });
  }
  // Actually test a real Sanity connection
  try {
    await adminClient.fetch('*[_type == "sanity.imageAsset"][0]{_id}');
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, reason: String(e) });
  }
}
