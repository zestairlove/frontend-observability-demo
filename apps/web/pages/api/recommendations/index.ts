// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../utils/request';
import { handleApiError } from '../../../utils/errors/handleApiError';
import { logger } from '../../../utils/logger';

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
        logger.info('reqeust /recommendations');
        const headerAuthValue = req.headers.authorization;
        const result = await request<Product[]>({
          url: `${RECOMMEND_API_ADDR}/recommendations`,
          headers: {
            'content-type': 'application/json',
            ...(headerAuthValue ? { authorization: headerAuthValue } : {}),
          },
        });
        logger.info('request /recommendations success');

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

export default handler;
