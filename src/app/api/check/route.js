import { client } from '@/sanity/lib/client';
import { TEAM_QUERY } from '@/lib/queries';

export async function GET() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  let result = { count: 0, names: [], error: null };
  try {
    const team = await client.fetch(TEAM_QUERY);
    result.count = team?.length ?? 0;
    result.names = team?.map(m => m.name) ?? [];
  } catch (e) {
    result.error = String(e);
  }

  return Response.json({ projectId: pid, ...result });
}
