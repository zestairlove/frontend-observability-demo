import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import morgan from 'koa-morgan';
import projectsJSON from './products/products.json';
import { logger } from './logger';

export const createServer = (): Koa => {
  const app = new Koa();
  const router = new Router();

  router.get('/products/:productId', ctx => {
    logger.info(`GET /products/${ctx.params.productId}`);
    const { productId } = ctx.params;
    const product = projectsJSON.products.find(p => p.id === productId);

    if (!product) {
      logger.error(`Product not found: ${productId}`);
      ctx.status = 404;
      ctx.body = { error: 'product not found' };
      return;
    }

    ctx.body = product;
  });

  router.get('/products', ctx => {
    logger.info('GET /products');
    ctx.body = projectsJSON.products;
  });

  router.get('/recommendations', ctx => {
    logger.info('GET /recommendations');
    const recommendations = projectsJSON.products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    ctx.body = recommendations;
  });

  router.get('/status', ctx => {
    logger.info('GET /status');
    ctx.body = { ok: true };
  });

  app
    .use(morgan('dev'))
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
};
