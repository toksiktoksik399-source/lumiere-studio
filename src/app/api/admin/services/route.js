import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

const FALLBACK = site.serviceCategories.flatMap((cat) =>
  cat.items.map((item, i) => ({ _id: `${cat.tab}_${i}`, title: item.name, price: item.price, description: item.desc || '', category: cat.tab, order: i }))
);

export async function GET() {
  if (!isSanityConfigured()) return Response.json({ items: FALLBACK, source: 'fallback' });
  try {
    const items = await adminClient.fetch(
      `*[_type == "service"] | order(order asc) { _id, title, description, price, category, order }`
    );
    return Response.json({ items: items.length > 0 ? items : FALLBACK, source: items.length > 0 ? 'sanity' : 'fallback' });
  } catch {
    return Response.json({ items: FALLBACK, source: 'fallback' });
  }
}

export async function POST(req) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  const data = await req.json();
  const doc = {
    _type: 'service',
    title: data.title,
    description: data.description,
    price: data.price,
    category: data.category,
    order: data.order ? Number(data.order) : 99,
  };
  const result = await adminClient.create(doc);
  return Response.json({ ok: true, id: result._id });
}
