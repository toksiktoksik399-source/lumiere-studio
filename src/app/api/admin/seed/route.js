import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

export async function POST() {
  if (!isSanityConfigured()) {
    return Response.json({ error: 'no_token' }, { status: 503 });
  }

  try {
    // 1. Delete ALL old documents
    const allIds = await adminClient.fetch(
      `*[_type in ["teamMember","testimonial","service"]]._id`
    );
    if (allIds.length > 0) {
      await Promise.all(allIds.map(id => adminClient.delete(id)));
    }

    // 2. Create team members from site.js
    const team = await Promise.all(
      site.team.map((m, i) =>
        adminClient.create({
          _type: 'teamMember',
          name: m.name,
          role: typeof m.role === 'object' ? m.role.ru : m.role,
          experience: typeof m.experience === 'object' ? m.experience.ru : m.experience,
          spec: m.spec || '',
          bio: m.bio || '',
          photoUrl: m.photoUrl || '',
          order: i + 1,
        })
      )
    );

    // 3. Create testimonials from site.js
    const reviews = await Promise.all(
      site.testimonials.map((r, i) =>
        adminClient.create({
          _type: 'testimonial',
          name: r.name,
          text: typeof r.text === 'object' ? r.text.ru : r.text,
          rating: r.rating || 5,
          photoUrl: r.photoUrl || '',
          order: i + 1,
        })
      )
    );

    // 4. Create services from site.js
    const services = await Promise.all(
      site.serviceCategories.flatMap((cat) =>
        cat.items.map((item, i) =>
          adminClient.create({
            _type: 'service',
            title: typeof item.name === 'object' ? item.name.ru : item.name,
            description: item.desc || '',
            price: item.price || '',
            category: cat.tab,
            order: i + 1,
          })
        )
      )
    );

    return Response.json({
      ok: true,
      created: { team: team.length, reviews: reviews.length, services: services.length },
    });
  } catch (e) {
    console.error('Seed error:', e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
