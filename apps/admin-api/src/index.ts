import { createServer } from './server';
import { logger } from './logger';

const port = process.env.ADMIN_API_PORT || 3001;
const server = createServer();

server.listen(port, () => {
  logger.info(`adminApi running on ${port}`);
});
