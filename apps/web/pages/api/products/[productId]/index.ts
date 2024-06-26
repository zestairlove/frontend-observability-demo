// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../../utils/request';
// import InstrumentationMiddleware from '../../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = Product | Empty;

const PRODUCT_CATALOG_SERVICE_ADDR =
  process.env.PRODUCT_CATALOG_SERVICE_ADDR || 'http://localhost:3001';

const handler = async (
  { method, query }: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (method) {
    case 'GET': {
      const { productId = '' } = query;
      console.log('productId in nextrouter', productId);
      const result = await request<Product[]>({
        url: `${PRODUCT_CATALOG_SERVICE_ADDR}/products/${productId}`,
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
