// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../utils/request';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = Product[] | Empty;

const RECOMMEND_API_ADDR =
  process.env.RECOMMEND_API_ADDR || 'http://localhost:3003';

const handler = async (
  { method, query }: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  console.log('query.userId', query.userId);
  switch (method) {
    case 'GET': {
      const result = await request<Product[]>({
        url: `${RECOMMEND_API_ADDR}/recommendations`,
        queryParams: {
          userId: query.userId,
        },
      });

      return res.status(200).json(result);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

// export default InstrumentationMiddleware(handler);
export default handler;
