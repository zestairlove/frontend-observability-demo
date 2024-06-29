// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../utils/request';
import { handleApiError } from '../../../utils/errors/handleApiError';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = Product[] | Empty;

const RECOMMEND_API_ADDR =
  process.env.RECOMMEND_API_ADDR || 'http://localhost:3003';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (req.method) {
    case 'GET': {
      try {
        const result = await request<Product[]>({
          url: `${RECOMMEND_API_ADDR}/recommendations`,
          queryParams: {
            userId: req.query.userId,
          },
        });

        return res.status(200).json(result);
      } catch (err) {
        return handleApiError(err, res);
      }
    }

    default: {
      return res.status(405).send('Method not allowed');
    }
  }
};

// export default InstrumentationMiddleware(handler);
export default handler;
