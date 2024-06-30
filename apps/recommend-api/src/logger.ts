import { getLogger } from '@repo/logger';

export const logger = getLogger({
  level: 'info',
  serverGroup: 'recommend-api',
  zone: 'dev'
});
