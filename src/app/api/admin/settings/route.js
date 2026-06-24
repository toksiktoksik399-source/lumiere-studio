import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

const DOC_ID = 'siteSettings';

function strOf(v) { return typeof v === 'object' ? (v?.ru ?? '') : (v ?? ''); }

function defaults() {
  return {
    phone: site.phone, email: site.email, address: site.address,
    workingHours: site.workingHours, telegram: site.telegram,
    whatsapp: site.whatsapp, instagram: site.instagram ?? '',
    heroLine1: site.heroHeading[0], heroLine2: site.heroHeading[1], heroLine3: site.heroHeading[2],
    heroSubheading: site.heroSubheading, heroImageUrl: site.heroImage,
    aboutText: site.aboutText ?? '',
    galleryUrls: site.gallery ?? [],
    clinicImage1Url: site.clinicImages?.[0] ?? '',
    clinicImage2Url: site.clinicImages?.[1] ?? '',
  };
}

export async function GET() {
  if (!isSanityConfigured()) return Response.json({ ...defaults(), source: 'fallback' });
  try {
    const doc = await adminClient.fetch(`*[_id == "${DOC_ID}"][0]`);
    if (!doc) return Response.json({ ...defaults(), source: 'defaults' });
    const d = defaults();
    return Response.json({
      phone:          doc.phone ?? d.phone,
      email:          doc.email ?? d.email,
      address:        strOf(doc.address) || d.address,
      workingHours:   strOf(doc.workingHours) || d.workingHours,
      telegram:       doc.telegram ?? d.telegram,
      whatsapp:       doc.whatsapp ?? d.whatsapp,
      instagram:      doc.instagram ?? d.instagram,
      heroLine1:      doc.heroLine1 ?? d.heroLine1,
      heroLine2:      doc.heroLine2 ?? d.heroLine2,
      heroLine3:      doc.heroLine3 ?? d.heroLine3,
      heroSubheading: strOf(doc.heroSubheading) || d.heroSubheading,
      heroImageUrl:   doc.heroImageUrl ?? d.heroImageUrl,
      aboutText:      strOf(doc.aboutText) || d.aboutText,
      galleryUrls:    doc.galleryUrls ?? d.galleryUrls,
      clinicImage1Url: doc.clinicImage1Url ?? d.clinicImage1Url,
      clinicImage2Url: doc.clinicImage2Url ?? d.clinicImage2Url,
      source: 'sanity',
    });
  } catch (e) {
    return Response.json({ ...defaults(), source: 'fallback', error: String(e) });
  }
}

export async function PATCH(req) {
  if (!isSanityConfigured()) return Response.json({ error: 'no_token' }, { status: 503 });
  try {
    const body = await req.json();
    await adminClient.createIfNotExists({ _id: DOC_ID, _type: 'siteSettings' });
    await adminClient.patch(DOC_ID).set(body).commit();
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
