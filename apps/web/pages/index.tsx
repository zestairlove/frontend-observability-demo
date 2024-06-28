// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage, GetServerSidePropsContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { UserPayload } from '@repo/types';
import ApiGateway from '../gateways/Api.gateway';
import * as S from '../styles/Home.styled';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/ProductList/ProductList';
import SessionGateway from '../gateways/Session.gateway';

const Home: NextPage<{ currentUser: UserPayload | null }> = ({
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
  // console.log('getServerSideProps req.cookies', req.cookies);
  // console.log('getServerSideProps req.cookies.session', req.cookies.session);
  // console.log('getServerSideProps req.headers', req.headers);

  // const body = Buffer.from(req.cookies.session, 'base64').toString('utf8');
  // console.log('JSON.parse(body)', JSON.parse(body));
  //const { currentUser } = await SessionGateway.getCurrentUser();
  // const response = await fetch('http://localhost:3001/current-user', {
  //   headers: {
  //     'content-type': 'application/json',
  //     session: req.cookies.session || '',
  //   },
  // });
  // const { currentUser } = await response.json();
  // console.log('currentUser in Home', currentUser);

  const { currentUser } = await SessionGateway.getCurrentUser();
  return {
    props: {
      currentUser,
    },
  };
};
