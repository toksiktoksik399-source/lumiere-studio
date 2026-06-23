import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const adminClient = createClient({
  projectId: projectId || '',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export function isSanityConfigured() {
  return Boolean(process.env.SANITY_API_TOKEN && projectId && dataset);
}
