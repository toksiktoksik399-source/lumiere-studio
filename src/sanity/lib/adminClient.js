import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Safe creation — don't throw if projectId is missing
let adminClient = null;
try {
  if (projectId) {
    adminClient = createClient({
      projectId,
      dataset: dataset || 'production',
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }
} catch {}

export { adminClient };

export function isSanityConfigured() {
  return Boolean(adminClient && process.env.SANITY_API_TOKEN);
}
