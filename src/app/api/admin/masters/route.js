import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

export async function GET() {
  if (!isSanityConfigured()) {
    return Response.json({ items: site.team, source: 'fallback' });
  }
  try {
    const items = await adminClient.fetch(
      `*[_type == "teamMember"] | order(order asc) {
        _id, name, role, experience, spec, bio, order,
        "photoUrl": coalesce(photoUrl, photo.asset->url)
      }`
    );
    // Return exactly what Sanity has — even if empty. Don't inject site.js fallback.
    return Response.json({ items: items ?? [], source: 'sanity' });
  } catch (e) {
    return Response.json({ items: site.team, source: 'fallback', error: String(e) });
  }
}

export async function POST(req) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  const data = await req.json();
  const result = await adminClient.create({
    _type: 'teamMember',
    name: data.name, role: data.role, experience: data.experience,
    spec: data.spec, bio: data.bio, photoUrl: data.photoUrl,
    order: data.order ? Number(data.order) : 99,
  });
  return Response.json({ ok: true, id: result._id });
}
