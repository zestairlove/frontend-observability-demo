// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Product } from '@repo/types';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './ProductList.styled';

interface IProps {
  productList: Product[];
}

const ProductList = ({ productList }: IProps) => {
  return (
    <S.ProductList>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </S.ProductList>
  );
};

export default ProductList;
