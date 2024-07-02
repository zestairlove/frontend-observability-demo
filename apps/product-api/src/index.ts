import { createServer } from './server';
import { logger } from './logger';

const port = process.env.PRODUCT_API_PORT || 3002;
const server = createServer();

server.listen(port, () => {
  logger.info(`productApi running on ${port}`);
});
