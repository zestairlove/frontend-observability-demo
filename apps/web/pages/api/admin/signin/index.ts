// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, UserPayload } from '@repo/types';
import request from '../../../../utils/request';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = UserPayload | Empty;

const ADMIN_API_ADDR = process.env.ADMIN_API_ADDR || 'http://localhost:3001';

const handler = async (
  { method, query }: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (method) {
    case 'GET': {
      // const result = await request<UserPayload>({
      //   url: `${ADMIN_API_ADDR}/signin`,
      // });
      // console.log('result', result);
      // return res.status(200).json(result);

      const reponse = await fetch(`${ADMIN_API_ADDR}/signin`);
      const result = await reponse.json();
      res.setHeader('Set-Cookie', reponse.headers.getSetCookie());
      return res.status(200).json(result);
    }

    default: {
      return res.status(405).send('Method not allowed');
    }
  }
};

// export default InstrumentationMiddleware(handler);
export default handler;
