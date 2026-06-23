import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';

export async function PUT(req, { params }) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  const { id } = await params;
  const data = await req.json();
  await adminClient.patch(id).set({
    title: data.title, description: data.description,
    price: data.price, category: data.category,
    order: data.order ? Number(data.order) : 99,
  }).commit();
  return Response.json({ ok: true });
}

export async function DELETE(req, { params }) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  const { id } = await params;
  await adminClient.delete(id);
  return Response.json({ ok: true });
}
