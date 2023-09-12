import { log } from '@sqrib/shared';
import { getGlobalMetricsRepository } from '../repositories';

export async function getGlobalMetricsService() {
  log.info('Trying to get global metrics');
  const globalMetrics = await getGlobalMetricsRepository();
  if (!globalMetrics) {
    log.error('Failed to get global metrics');
  }
  log.info('Successfully got global metrics');
  return globalMetrics;
}
