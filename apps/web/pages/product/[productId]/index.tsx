// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@repo/types';
import { Button } from '@repo/ui/Button';
import { Select } from '@repo/ui/Select';
import * as Sentry from '@sentry/nextjs';
import Layout from '../../../components/Layout/Layout';
import Footer from '../../../components/Footer/Footer';
import ProductPrice from '../../../components/ProductPrice/ProductPrice';
import Recommendations from '../../../components/Recommendations/Recommendations';
import ApiGateway from '../../../gateways/Api.gateway';
import * as S from '../../../styles/ProductDetail.styled';
import SessionGateway from '../../../gateways/Session.gateway';
import { getErrorMessage } from '../../../utils/errors/getErrorMessage';
import { useUserState } from '../../../Providers/UserProvider';
import { logger } from '../../../utils/logger';
import request from '../../../utils/request';
import request2 from '../../../utils/request2';
import { ApiError } from '../../../utils/errors/ApiError';

const quantityOptions = new Array(10).fill(0).map((_, i) => i + 1);

const ProductDetail: NextPage = () => {
  const { currentUser } = useUserState();
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
    } = {} as Product,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ApiGateway.getProduct(productId),
    enabled: !!productId,
  });

  // const { data: mock400, refetch } = useQuery({
  //   queryKey: ['mock400', 11],
  //   queryFn: () => ,
  //   enabled: false,
  //   staleTime: 0,
  // });

  //console.log('mock400', mock400);

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
        <div>
          <Button
            onClick={async () => {
              const mock400 = await request({ url: '/api/admin/mock400' });
              console.log('mock400', mock400);
            }}
          >
            mock400
          </Button>
          <Button
            onClick={async () => {
              const mock400Block = await request({ url: '/api/admin/mock400' });
              console.log('mock400Block', mock400Block);
            }}
          >
            mock400Block
          </Button>
          <Button
            onClick={async () => {
              const mock500 = await request({ url: '/api/admin/mock500' });
              console.log('mock500', mock500);
            }}
          >
            mock500
          </Button>
          <Button
            onClick={async () => {
              try {
                const mock500 = await request({ url: '/api/admin/mock500' });
                console.log('mock500', mock500);
              } catch (err) {
                if (err instanceof ApiError) {
                  console.log('Handle ApiError', err);
                  const error = new Error('ApiError를 처리했습니다.', {
                    cause: err,
                  });
                  error.name = 'HandledException';
                  Sentry.captureException(error);
                } else if (err instanceof SyntaxError) {
                  console.log('never mind');
                } else {
                  throw err;
                }
              }
            }}
          >
            handle mock500 and report
          </Button>
        </div>
        <div style={{ marginTop: '8px' }}>
          <Button
            $type="secondary"
            onClick={async () => {
              const mock400 = await request2({ url: '/api/admin/mock400' });
              console.log('mock400 request2', mock400);
            }}
          >
            mock400
          </Button>
          <Button
            $type="secondary"
            onClick={async () => {
              const mock400Block = await request2({
                url: '/api/admin/mock400',
              });
              console.log('mock400Block request2', mock400Block);
            }}
          >
            mock400Block
          </Button>
          <Button
            $type="secondary"
            onClick={async () => {
              const mock500 = await request2({ url: '/api/admin/mock500' });
              console.log('mock500 request2', mock500);
            }}
          >
            mock500
          </Button>
        </div>
        {currentUser && <Recommendations />}
      </S.ProductDetail>
      <Footer />
    </Layout>
  );
};

export default ProductDetail;

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  let currentUser = null;
  const token = req.cookies.token;

  try {
    if (token) {
      currentUser = await SessionGateway.getCurrentUser(token);
    }
  } catch (err) {
    logger.info(`getCurrentUser failed: ${getErrorMessage(err)}`);
  }

  return {
    props: {
      currentUser,
      ...(token ? { token } : {}),
    },
  };
};
