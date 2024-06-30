import { createServer } from './server';
import { logger } from './logger';

console.log('process.env.PRODUCT_API_PORT', process.env.PRODUCT_API_PORT);

const port = process.env.PRODUCT_API_PORT || 3002;
const server = createServer();

server.listen(port, () => {
  logger.info(`productApi running on ${port}`);
});
