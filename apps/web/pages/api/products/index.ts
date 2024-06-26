// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, Product } from '@repo/types';
import request from '../../../utils/request';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';
// import { Empty, Product, Money } from '../../../protos/demo';
// import ProductCatalogService from '../../../services/ProductCatalog.service';

type TResponse = Product[] | Empty;

const PRODUCT_CATALOG_SERVICE_ADDR =
  process.env.PRODUCT_CATALOG_SERVICE_ADDR || 'http://localhost:3001';

console.log(
  'process.env.PRODUCT_CATALOG_SERVICE_ADDR',
  process.env.PRODUCT_CATALOG_SERVICE_ADDR
);

const handler = async (
  { method, query }: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  console.log('request', { method, query });
  switch (method) {
    case 'GET': {
      const { currencyCode = '' } = query;
      // const productList = await ProductCatalogService.listProducts(
      //   currencyCode as string
      // );
      const result = await request<Product[]>({
        url: `${PRODUCT_CATALOG_SERVICE_ADDR}/products`,
        queryParams: { currencyCode },
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
