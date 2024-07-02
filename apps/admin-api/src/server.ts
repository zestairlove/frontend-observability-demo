import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import promClient from 'prom-client';
import promBundle from 'express-prom-bundle';
import { faker } from '@faker-js/faker';
import { User } from '@repo/types';
import { logger } from './logger';

// Metric
function normalizePath(req: Request) {
  return req.route.path;
}

promClient.register.setDefaultLabels({
  serverGroup: 'admin-api',
  zone: 'dev'
});

const customRequestCounter = new promClient.Counter({
  name: 'nm_heimdall_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status_code']
});
promClient.register.registerMetric(customRequestCounter);

const metricsMiddleware = promBundle({
  buckets: [0.1, 0.25, 0.5, 0.75, 1.0, 2.5, 5.0, 7.5, 10.0, 25.0],
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {}
  },
  normalizePath
});

// Express
export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(metricsMiddleware)
    .get('/current-user', authUserMiddleware, (req, res) => {
      logger.info('received request for /current-user');
      return res.json(req.currentUser || null);
    })
    .get(`/signin`, (req, res) => {
      logger.info('received request for /signin');
      const existingUser = createRandomUser();
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name
        },
        process.env.ENV_JWT_KEY || 'keyboard-cat',
        {
          expiresIn: '1m'
        }
      );
      res.json({
        user: existingUser,
        token: userJwt
      });
    })
    .get('/test_io_task', async (req, res) => {
      await sleep(1000);
      logger.info('test_io_task completed');

      customRequestCounter
        .labels({
          method: req.method,
          path: req.route.path,
          status_code: res.statusCode
        })
        .inc();
      res.json({ ok: true });
    })
    .get('/test_cpu_task', (req, res) => {
      for (let i = 0; i < 1000; i++) {
        const _ = i * i * i;
      }
      logger.info('test_cpu_task completed');

      customRequestCounter
        .labels({
          method: req.method,
          path: req.route.path,
          status_code: res.statusCode
        })
        .inc();
      res.json({ ok: true });
    })
    .get('/test_random_status', (req, res) => {
      const statusCode = getRandomStatusCode();
      logger.info('test_random_status completed');

      customRequestCounter
        .labels({
          method: req.method,
          path: req.route.path,
          status_code: res.statusCode
        })
        .inc();
      res.status(statusCode).json({ path: '/random_status' });
    })
    .get('/test_random_sleep', async (req, res) => {
      const sleepTime = Math.floor(Math.random() * 5) * 1000;
      await sleep(sleepTime);
      logger.info('test_random_sleep completed');

      customRequestCounter
        .labels({
          method: req.method,
          path: req.route.path,
          status_code: res.statusCode
        })
        .inc();
      res.json({ ok: true });
    })
    .get('/test_error', (req, res) => {
      const err = new Error('got error!!!!');
      logger.error('test_error completed ', err);

      customRequestCounter
        .labels({
          method: req.method,
          path: req.route.path,
          status_code: res.statusCode
        })
        .inc();
      throw err;
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) return next();

  try {
    const token = req.headers.authorization.substring('Bearer '.length);
    const payload = jwt.verify(
      token,
      process.env.ENV_JWT_KEY || 'keyboard-cat'
    ) as User;
    req.currentUser = {
      id: payload.id,
      email: payload.email,
      name: payload.name
    };
    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: User;
  }
}

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email()
  };
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomStatusCode() {
  const statusCodes = [200, 200, 200, 300, 400, 500];
  const randomIndex = Math.floor(Math.random() * statusCodes.length);
  const statusCode = statusCodes[randomIndex];
  return statusCode || 200;
}
