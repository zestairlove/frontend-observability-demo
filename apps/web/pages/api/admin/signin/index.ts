// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, AuthPayload } from '@repo/types';
import request from '../../../../utils/request';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = AuthPayload | Empty;

const ADMIN_API_ADDR = process.env.ADMIN_API_ADDR || 'http://localhost:3001';

const handler = async (
  { method, query }: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (method) {
    case 'GET': {
      const result = await request<AuthPayload>({
        url: `${ADMIN_API_ADDR}/signin`,
      });
      res.setHeader(
        'Set-Cookie',
        `token=${result.token}; Max-Age=${1000 * 60 * 60 * 2}; Path=/; HttpOnly`
      );
      return res.status(200).json(result);
    }

    default: {
      return res.status(405).send('Method not allowed');
    }
  }
};

// export default InstrumentationMiddleware(handler);
export default handler;
