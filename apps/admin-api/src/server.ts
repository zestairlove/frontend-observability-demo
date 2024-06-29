import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { User } from '@repo/types';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(morgan('dev'))
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
          expiresIn: '2h'
        }
      );
      res.json({
        user: existingUser,
        token: userJwt
      });
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
  } catch (err) {
    throw err;
  }
  next();
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
