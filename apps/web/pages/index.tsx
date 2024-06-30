// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage, GetServerSidePropsContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { AuthPayload } from '@repo/types';
import ApiGateway from '../gateways/Api.gateway';
import * as S from '../styles/Home.styled';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/ProductList/ProductList';
import SessionGateway from '../gateways/Session.gateway';
import { getErrorMessage } from '../utils/errors/getErrorMessage';
import { logger } from '../utils/logger';

const Home: NextPage<{ currentUser: AuthPayload | null }> = ({
  currentUser,
}) => {
  console.log('currentUser in Home', currentUser);
  const { data: productList = [] } = useQuery({
    queryKey: ['products'],
    queryFn: ApiGateway.listProducts,
  });

  return (
    <Layout>
      <S.Home>
        <Banner />
        <S.Container>
          <S.Row>
            <S.Content>
              <S.HotProductsTitle id="hot-products">
                Hot Products
              </S.HotProductsTitle>
              <ProductList productList={productList} />
            </S.Content>
          </S.Row>
        </S.Container>
        <Footer />
      </S.Home>
    </Layout>
  );
};

export default Home;

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
      token,
    },
  };
};
