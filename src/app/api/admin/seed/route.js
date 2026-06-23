import { adminClient, isSanityConfigured } from '@/sanity/lib/adminClient';
import { site } from '@/content/site';

export async function POST() {
  if (!isSanityConfigured()) {
    return Response.json({ error: 'no_token' }, { status: 503 });
  }

  try {
    // Use createOrReplace with fixed IDs — no delete needed, no permission issues
    const mutations = [
      // Team members
      ...site.team.map((m, i) => ({
        createOrReplace: {
          _id: `lumiere-team-${i + 1}`,
          _type: 'teamMember',
          name: m.name,
          role: typeof m.role === 'object' ? m.role.ru : m.role,
          experience: typeof m.experience === 'object' ? m.experience.ru : m.experience,
          spec: m.spec || '',
          bio: m.bio || '',
          photoUrl: m.photoUrl || '',
          order: i + 1,
        },
      })),
      // Testimonials
      ...site.testimonials.map((r, i) => ({
        createOrReplace: {
          _id: `lumiere-review-${i + 1}`,
          _type: 'testimonial',
          name: r.name,
          text: typeof r.text === 'object' ? r.text.ru : r.text,
          rating: r.rating || 5,
          photoUrl: r.photoUrl || '',
          order: i + 1,
        },
      })),
      // Services
      ...site.serviceCategories.flatMap((cat, ci) =>
        cat.items.map((item, ii) => ({
          createOrReplace: {
            _id: `lumiere-service-${cat.tab}-${ii + 1}`,
            _type: 'service',
            title: typeof item.name === 'object' ? item.name.ru : item.name,
            description: item.desc || '',
            price: item.price || '',
            category: cat.tab,
            order: ci * 100 + ii + 1,
          },
        }))
      ),
    ];

    const result = await adminClient.mutate(mutations);

    return Response.json({
      ok: true,
      created: {
        team: site.team.length,
        reviews: site.testimonials.length,
        services: site.serviceCategories.reduce((s, c) => s + c.items.length, 0),
      },
    });
  } catch (e) {
    console.error('Seed error:', e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
