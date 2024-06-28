// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UserPayload, Product } from '@repo/types';
import { Select } from '@repo/ui/Select';
import Layout from '../../../components/Layout/Layout';
import Footer from '../../../components/Footer/Footer';
import ProductPrice from '../../../components/ProductPrice/ProductPrice';
import Recommendations from '../../../components/Recommendations/Recommendations';
import ApiGateway from '../../../gateways/Api.gateway';
import * as S from '../../../styles/ProductDetail.styled';
import SessionGateway from '../../../gateways/Session.gateway';

const quantityOptions = new Array(10).fill(0).map((_, i) => i + 1);

const ProductDetail: NextPage<{ currentUser: UserPayload | null }> = ({
  currentUser,
}) => {
  console.log('currentUser in ProductDetail', currentUser);
  const { query } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const productId = query.productId as string;

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  const {
    data: {
      name,
      picture,
      description,
      priceUsd = { units: 0, currencyCode: 'USD', nanos: 0 },
      categories,
    } = {} as Product,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ApiGateway.getProduct(productId),
    enabled: !!productId,
  });

  return (
    <Layout>
      <S.ProductDetail>
        <S.Container>
          {picture && <S.Image $src={'/images/products/' + picture} />}
          <S.Details>
            <S.Name>{name}</S.Name>
            <S.Description>{description}</S.Description>
            <S.ProductPrice>
              <ProductPrice price={priceUsd} />
            </S.ProductPrice>
            <S.Text>Quantity</S.Text>
            <Select
              onChange={event => setQuantity(+event.target.value)}
              value={quantity}
            >
              {quantityOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <S.AddToCart
              onClick={() => {
                console.log('handleClickCart');
              }}
            >
              <Image src="/icons/Cart.svg" height="15" width="15" alt="cart" />{' '}
              Add To Cart
            </S.AddToCart>
          </S.Details>
        </S.Container>
        {currentUser && <Recommendations />}
      </S.ProductDetail>
      <Footer />
    </Layout>
  );
};

export default ProductDetail;

export const getServerSideProps = async () => {
  const { currentUser } = await SessionGateway.getCurrentUser();
  return {
    props: {
      currentUser,
    },
  };
};
