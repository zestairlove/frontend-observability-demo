import { log } from '@repo/logger';
import { createServer } from './server';

const port = process.env.RECOMMEND_API_PORT || 3003;
const server = createServer();

(async () => {
  try {
    await server.listen({ port: Number(port) });
    const message = `recommenApi running on ${port}`;
    log(message);
    server.log.info(message);
  } catch (err) {
    const message = `recommenApi failed to start on ${port}`;
    log(message);
    server.log.error(new Error(message, { cause: err }));
    process.exit(1);
  }
})();
