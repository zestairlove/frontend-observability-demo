import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
// import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { User } from '@repo/types';
import { logger } from './logger';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    // .use(morgan('dev'))
    .get('/current-user', authUserMiddleware, (req, res) => {
      return res.json(req.currentUser || null);
    })
    .get(`/signin`, (req, res) => {
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
      res.json({ ok: true });
    })
    .get('/test_cpu_task', (req, res) => {
      for (let i = 0; i < 1000; i++) {
        const _ = i * i * i;
      }
      logger.info('test_cpu_task completed');
      res.json({ ok: true });
    })
    .get('/test_random_status', (req, res) => {
      const statusCode = getRandomStatusCode();
      logger.info('test_random_status completed');
      res.status(statusCode).json({ path: '/random_status' });
    })
    .get('/test_random_sleep', async (req, res) => {
      const sleepTime = Math.floor(Math.random() * 5) * 1000;
      await sleep(sleepTime);
      logger.info('test_random_sleep completed');
      res.json({ ok: true });
    })
    .get('/test_error', (req, res) => {
      const err = new Error('got error!!!!');
      logger.error('test_error completed ', err);
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
    const payload = jwt.verify(token, process.env.ENV_JWT_KEY!) as User;
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
