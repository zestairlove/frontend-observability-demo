import { getLogger } from '@repo/logger';

export const logger = getLogger({
  level: 'info',
  serverGroup: 'admin-api',
  zone: 'dev'
});
