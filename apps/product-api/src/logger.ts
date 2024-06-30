import { getLogger } from '@repo/logger';

export const logger = getLogger({
  level: 'info',
  serverGroup: 'product-api',
  zone: 'dev'
});
