// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../../utils/request';
import { handleApiError } from '../../../../utils/errors/handleApiError';

type TResponse = Product | Empty;

const PRODUCT_API_ADDR =
  process.env.PRODUCT_API_ADDR || 'http://localhost:3001';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (req.method) {
    case 'GET': {
      try {
        const { productId = '' } = req.query;
        const result = await request<Product[]>({
          url: `${PRODUCT_API_ADDR}/products/${productId}`,
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

export default handler;
