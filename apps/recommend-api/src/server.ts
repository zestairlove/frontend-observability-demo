import Fastify, { FastifyInstance } from 'fastify';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
import seedrandom from 'seedrandom';
import * as api from '@opentelemetry/api';
import { logger } from './logger';
import { logger2 } from './logger2';

const ADMIN_API_ADDR = process.env.ADMIN_API_ADDR || 'http://localhost:3001';
const PRODUCTS_API_ADDR =
  process.env.PRODUCTS_API_ADDR || 'http://localhost:3002';

export const createServer = (): FastifyInstance => {
  const app = Fastify();

  app.register(formbody);
  app.register(cors, { origin: '*' });

  app.get('/recommendations', async (request, reply) => {
    logger.info('GET /recommendations');
    logger2('GET /recommendations');
    const productResponse = await fetch(`${PRODUCTS_API_ADDR}/products`);
    const products = await productResponse.json();
    const headerAuthValue = request.headers.authorization;
    const userResponse = await fetch(`${ADMIN_API_ADDR}/current-user`, {
      headers: {
        ...(headerAuthValue ? { authorization: headerAuthValue } : {})
      }
    });
    const user = await userResponse.json();
    const recommendedProducts = getRecommendProducts(user.id, products);
    return recommendedProducts;
  });

  app.get('/status', async (request, reply) => {
    logger.info('GET /status');
    return { ok: true };
  });

  return app;
};

function getShuffledArray(array: unknown[], rng: () => number) {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// async function getRecommendProducts(
//   userId: string,
//   productArray: undefined[],
//   count = 4
// ) {
//   await sleep(1000);
//   const rng = seedrandom(userId);
//   const shuffledProducts = getShuffledArray(productArray, rng);
//   return shuffledProducts.slice(0, count);
// }

async function getRecommendProducts(
  userId: string,
  productArray: undefined[],
  count = 4
) {
  let shuffledProducts: unknown[] = [];
  await api.trace
    .getTracer('manual')
    .startActiveSpan('getRecommendProducts', async span => {
      span.setAttributes({ userId });
      await sleep(1000);
      const rng = seedrandom(userId);
      shuffledProducts = getShuffledArray(productArray, rng).slice(0, count);
      span.addEvent('shuffled products', { count: shuffledProducts.length });
      await sleep(1000);
      span.end();
    });
  return shuffledProducts;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
