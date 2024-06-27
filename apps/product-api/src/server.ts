import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import morgan from 'koa-morgan';
import projectsJSON from './products/products.json';

export const createServer = (): Koa => {
  const app = new Koa();
  const router = new Router();

  router.get('/products/:productId', ctx => {
    const { productId } = ctx.params;
    const product = projectsJSON.products.find(p => p.id === productId);

    if (!product) {
      ctx.status = 404;
      ctx.body = { error: 'product not found' };
      return;
    }

    ctx.body = product;
  });

  router.get('/products', ctx => {
    ctx.body = projectsJSON.products;
  });

  router.get('/recommendations', ctx => {
    const recommendations = projectsJSON.products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    ctx.body = recommendations;
  });

  router.get('/status', ctx => {
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
