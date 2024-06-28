// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { Product } from '@repo/types';
import request from '../utils/request';
// import { AttributeNames } from '../utils/enums/AttributeNames';
// import { context, propagation } from "@opentelemetry/api";

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

  listRecommendations(userId: string) {
    return request<Product[]>({
      url: `${basePath}/recommendations`,
      queryParams: {
        userId,
      },
    });
  },
});

/**
 * Extends all the API calls to set baggage automatically.
 */
// const ApiGateway = new Proxy(Apis(), {
//   get(target, prop, receiver) {
//     const originalFunction = Reflect.get(target, prop, receiver);
//     if (typeof originalFunction !== 'function') {
//       return originalFunction;
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return function (...args: any[]) {
//       const baggage =
//         propagation.getActiveBaggage() || propagation.createBaggage();
//       const newBaggage = baggage.setEntry(AttributeNames.SESSION_ID, {
//         value: userId,
//       });
//       const newContext = propagation.setBaggage(context.active(), newBaggage);
//       return context.with(newContext, () => {
//         return Reflect.apply(originalFunction, undefined, args);
//       });
//     };
//   },
// });
const ApiGateway = Apis();

export default ApiGateway;
