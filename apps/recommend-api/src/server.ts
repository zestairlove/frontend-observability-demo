import Fastify, { FastifyInstance } from 'fastify';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
import seedrandom from 'seedrandom';

const PRODUCTS_API_ADDR =
  process.env.PRODUCTS_API_ADDR || 'http://localhost:3002';

export const createServer = (): FastifyInstance => {
  const app = Fastify({ logger: true });

  app.register(formbody);
  app.register(cors, { origin: '*' });

  app.get('/recommendations', async (request, reply) => {
    const { userId } = request.query as { userId: string };
    const response = await fetch(`${PRODUCTS_API_ADDR}/products`);
    const products = await response.json();
    const recommendedProducts = getRecommendProducts(userId, products);
    return recommendedProducts;
  });

  app.get('/status', async (request, reply) => {
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

function getRecommendProducts(
  userId: string,
  productArray: undefined[],
  count = 4
) {
  const rng = seedrandom(userId);
  const shuffledProducts = getShuffledArray(productArray, rng);
  return shuffledProducts.slice(0, count);
}
