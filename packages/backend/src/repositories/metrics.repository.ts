import { prisma } from '../client';

export function getGlobalMetricsRepository() {
  return prisma.globalMetrics.findFirst();
}
