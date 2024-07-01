// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { Product } from '@repo/types';
import request from '../utils/request';

const FRONTEND_ADDR = process.env.FRONTEND_ADDR || 'http://localhost:3000';
const basePath = `${typeof window === 'undefined' ? FRONTEND_ADDR : ''}/api`;

const Apis = () => ({
  listProducts() {
    return request<Product[]>({
      url: `${basePath}/products`,
    });
  },

  getProduct(productId: string) {
    return request<Product>({
      url: `${basePath}/products/${productId}`,
    });
  },

  listRecommendations(token?: string) {
    const headerAuth = { authorization: `Bearer ${token}` };
    console.log('headerAuth in listRecommendations', headerAuth);
    return request<Product[]>({
      url: `${basePath}/recommendations`,
      headers: {
        'content-type': 'application/json',
        ...(token ? headerAuth : {}),
      },
    });
  },
});

const ApiGateway = Apis();

export default ApiGateway;
