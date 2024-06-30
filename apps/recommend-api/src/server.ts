import Fastify, { FastifyInstance } from 'fastify';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
import seedrandom from 'seedrandom';

const ADMIN_API_ADDR = process.env.ADMIN_API_ADDR || 'http://localhost:3001';
const PRODUCTS_API_ADDR =
  process.env.PRODUCTS_API_ADDR || 'http://localhost:3002';

export const createServer = (): FastifyInstance => {
  const app = Fastify();

  app.register(formbody);
  app.register(cors, { origin: '*' });

  app.get('/recommendations', async (request, reply) => {
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
