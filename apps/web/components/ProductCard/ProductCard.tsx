// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Product } from '../../protos/demo';
import ProductPrice from '../ProductPrice/ProductPrice';
import * as S from './ProductCard.styled';
import { useState, useEffect } from 'react';
import { RequestInfo } from 'undici-types';
import { useNumberFlagValue } from '@openfeature/react-sdk';

interface IProps {
  product: Product;
}

async function getImageWithHeaders(
  url: RequestInfo,
  headers: Record<string, string>
) {
  const res = await fetch(url, { headers });
  return await res.blob();
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
  // const imageSlowLoad = useNumberFlagValue('imageSlowLoad', 0);
  // const [imageSrc, setImageSrc] = useState<string>('');

  // useEffect(() => {
  //   const headers = {
  //     'x-envoy-fault-delay-request': imageSlowLoad.toString(),
  //     'Cache-Control': 'no-cache',
  //   };
  //   getImageWithHeaders('/images/products/' + picture, headers).then(blob => {
  //     setImageSrc(URL.createObjectURL(blob));
  //   });
  // }, [picture, imageSlowLoad]);

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
