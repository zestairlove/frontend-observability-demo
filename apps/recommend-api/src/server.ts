import Fastify, { FastifyInstance } from 'fastify';
import projectsJSON from './products/products.json';

export const createServer = (): FastifyInstance => {
  const app = Fastify({ logger: true });

  app.register(require('fastify-cors'), { origin: '*' });
  app.register(require('fastify-formbody'));

  app.get('/message/:name', async (request, reply) => {
    const { name } = request.params as { name: string };
    return { message: `hello ${name}` };
  });

  app.get('/products/:productId', async (request, reply) => {
    const { productId } = request.params as { productId: string };
    const product = projectsJSON.products.find(p => p.id === productId);

    if (!product) {
      reply.status(404).send({ error: 'product not found' });
      return;
    }

    return product;
  });

  app.get('/products', async (request, reply) => {
    return projectsJSON.products;
  });

  app.get('/recommendations', async (request, reply) => {
    const recommendations = projectsJSON.products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    return recommendations;
  });

  app.get('/status', async (request, reply) => {
    return { ok: true };
  });

  return app;
};
