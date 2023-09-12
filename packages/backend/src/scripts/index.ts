import { log } from '@sqrib/shared';
import { refreshUserMetrics, refreshGlobalMetrics } from './metricsOrchestrator.script';

log.info('Refreshing metrics... 🚀');
refreshUserMetrics();
refreshGlobalMetrics();
log.info('Metrics refreshed successfully... 🍾');
