import { createServer } from './server';
import { logger } from './logger';

const port = process.env.RECOMMEND_API_PORT || 3003;
const server = createServer();

(async () => {
  try {
    await server.listen({ port: Number(port) });
    const message = `recommenApi running on ${port}`;
    logger.info(message);
  } catch (err) {
    const message = `recommenApi failed to start on ${port}`;
    logger.error(message, new Error(message, { cause: err }));
    process.exit(1);
  }
})();
