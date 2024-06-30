import { getLogger } from '@repo/logger';

export const logger = getLogger({
  level: 'info',
  serverGroup: 'web',
  zone: 'dev',
});
