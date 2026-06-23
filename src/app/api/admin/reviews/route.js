import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

export async function GET() {
  if (!isSanityConfigured()) {
    return Response.json({ items: site.testimonials, source: 'fallback' });
  }
  try {
    const items = await adminClient.fetch(
      `*[_type == "testimonial"] | order(order asc) {
        _id, name, text, rating, order,
        "photoUrl": coalesce(photoUrl, photo.asset->url)
      }`
    );
    return Response.json({ items: items ?? [], source: 'sanity' });
  } catch (e) {
    return Response.json({ items: site.testimonials, source: 'fallback', error: String(e) });
  }
}

export async function POST(req) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  const data = await req.json();
  const result = await adminClient.create({
    _type: 'testimonial',
    name: data.name, text: data.text,
    rating: Number(data.rating) || 5,
    photoUrl: data.photoUrl,
    order: data.order ? Number(data.order) : 99,
  });
  return Response.json({ ok: true, id: result._id });
}
