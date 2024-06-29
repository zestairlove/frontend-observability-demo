// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Product } from '@repo/types';
import ProductPrice from '../ProductPrice/ProductPrice';
import * as S from './ProductCard.styled';

interface IProps {
  product: Product;
}

const ProductCard = ({
  product: {
    id,
    picture,
    name,
    priceUsd = {
      currencyCode: 'USD',
      units: 0,
      nanos: 0,
    },
  },
}: IProps) => {
  return (
    <S.Link href={`/product/${id}`}>
      <S.ProductCard>
        <S.Image $src={`/images/products/${picture}`} />
        <div>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>
            <ProductPrice price={priceUsd} />
          </S.ProductPrice>
        </div>
      </S.ProductCard>
    </S.Link>
  );
};

export default ProductCard;
