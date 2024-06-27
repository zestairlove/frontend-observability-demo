import { log } from '@repo/logger';
import { createServer } from './server';

console.log('process.env.PRODUCT_API_PORT', process.env.PRODUCT_API_PORT);

const port = process.env.PRODUCT_API_PORT || 3002;
const server = createServer();

server.listen(port, () => {
  log(`productApi running on ${port}`);
});
