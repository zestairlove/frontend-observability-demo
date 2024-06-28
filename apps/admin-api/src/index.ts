import { log } from '@repo/logger';
import { createServer } from './server';

const port = process.env.ADMIN_API_PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`adminApi running on ${port}`);
});
