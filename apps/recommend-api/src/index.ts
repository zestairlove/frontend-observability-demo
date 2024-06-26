import { log } from '@repo/logger';
import { createServer } from './server';

console.log('process.env.RECOMMEND_API_PORT', process.env.RECOMMEND_API_PORT);

const port = process.env.RECOMMEND_API_PORT || 3002;
const server = createServer();

server.listen(port, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  log(`api running on ${address}`);
});
