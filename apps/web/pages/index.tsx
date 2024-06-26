// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import ApiGateway from '../gateways/Api.gateway';
import * as S from '../styles/Home.styled';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/ProductList/ProductList';

const Home: NextPage = () => {
  const { data: productList = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => ApiGateway.listProducts(),
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
