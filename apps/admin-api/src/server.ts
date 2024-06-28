import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { UserPayload } from '@repo/types';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    // .set('trust proxy', true)
    .use(cookieSession({ signed: false, maxAge: 24 * 60 * 60 * 1000 }))
    .use(morgan('dev'))
    .get('/current-user', currentUser, (req, res) => {
      console.log('current-user requested');
      return res.json({ currentUser: req.currentUser || null });
    })
    .get(`/signin`, (req, res) => {
      const existingUser = createRandomUser();
      const userJwt = jwt.sign(
        {
          userId: existingUser.userId,
          userEmail: existingUser.userEmail
        },
        process.env.ENV_JWT_KEY!
      );

      // req.session = { jwt: userJwt };
      req.session = { jwt: userJwt };
      res.json(existingUser);
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('currentUser req.session', req.session);
  console.log('currentUser req.cookies', req.cookies);
  console.log('currentUser req.headers', req.headers);

  // if (!req.headers.token) {
  //   return next();
  // }

  // @ts-ignore
  // const payload2 = jwt.verify(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYWQxOTMzZC1jZmIxLTRmODEtYWYwMy02Yjk4ZTczYzEzNGIiLCJ1c2VyRW1haWwiOiJSaGlhbm5hLldpbmRsZXJAaG90bWFpbC5jb20iLCJpYXQiOjE3MTk1NjQ5MzB9.CwDRGm1g_v0lUkUpnNaECb8tgA1DF2Ltyk7hDj2rqt8',
  //   process.env.ENV_JWT_KEY!
  // );

  // console.log('payload2!!', payload2);

  // req.currentUser = payload2 as UserPayload;

  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.ENV_JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    throw err;
  }

  next();
};

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: UserPayload;
  }
}

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    userName: faker.internet.userName(),
    userEmail: faker.internet.email()
  };
}
