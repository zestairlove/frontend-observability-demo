import { createServer } from './server';
import { log } from '@repo/logger';

console.log(
  'process.env.PRODUCT_CATALOG_SERVICE_PORT',
  process.env.PRODUCT_CATALOG_SERVICE_PORT
);

const port = process.env.PRODUCT_CATALOG_SERVICE_PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
