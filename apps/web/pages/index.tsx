// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
// import Footer from '../components/Footer';
import Layout from '../components/Layout/Layout';
// import ProductList from '../components/ProductList';
import * as S from '../styles/Home.styled';
import ApiGateway from '../gateways/Api.gateway';
import { useCurrency } from '../providers/Currency.provider';
import Banner from '../components/Banner/Banner';

const Home: NextPage = () => {
  const { selectedCurrency } = useCurrency();
  console.log('selectedCurrency', selectedCurrency);

  // const { data: productList = [] } = useQuery(
  //   ['products', selectedCurrency],
  //   () => ApiGateway.listProducts(selectedCurrency)
  // );
  return (
    <Layout>
      <S.Home>
        <Banner />
      </S.Home>
    </Layout>
  );
};

export default Home;
