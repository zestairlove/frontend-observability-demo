import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import projectsJSON from './products/products.json';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get('/products/:productId', (req, res) => {
      const { productId } = req.params;
      const product = projectsJSON.products.find(p => p.id === productId);

      if (!product) {
        return res.status(404).json({ error: 'product not found' });
      }

      return res.json(product);
    })
    .get('/products', (req, res) => {
      return res.json(projectsJSON.products);
    })
    .get('/recommendations', (_, res) => {
      const recommendations = projectsJSON.products
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      return res.json(recommendations);
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
