import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';

export async function POST(request) {
  if (!isSanityConfigured()) {
    return Response.json({ error: 'no_token' }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !file.name) {
      return Response.json({ error: 'Файл не выбран' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const asset = await adminClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type || 'image/jpeg',
    });

    return Response.json({ ok: true, url: asset.url, id: asset._id });
  } catch (e) {
    console.error('Upload error:', e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
