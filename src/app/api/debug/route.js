import { client } from '@/sanity/lib/client';

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token     = process.env.SANITY_API_TOKEN ? '✓ set' : '✗ missing';

  let teamCount = 0;
  let teamSample = [];
  let error = null;

  try {
    const team = await client.fetch(`*[_type == "teamMember"] | order(order asc) { _id, name, role }`);
    teamCount  = team?.length ?? 0;
    teamSample = team?.slice(0, 3).map(m => m.name) ?? [];
  } catch (e) {
    error = String(e);
  }

  return Response.json({ projectId, dataset, token, teamCount, teamSample, error });
}
