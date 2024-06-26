// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { Money } from '@repo/types';

interface IProps {
  price: Money;
}

const ProductPrice = ({ price: { units, nanos } }: IProps) => {
  const total = units + nanos / 1000000000;

  return <span>$ {total.toFixed(2)}</span>;
};

export default ProductPrice;
