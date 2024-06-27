// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './Recommendations.styled';
import SessionGateway from '../../gateways/Session.gateway';
import ApiGateway from '../../gateways/Api.gateway';

const { userId } = SessionGateway.getSession();

const Recommendations = () => {
  const { data: recommendedProductList = [] } = useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => ApiGateway.listRecommendations(userId),
    refetchOnWindowFocus: false,
  });

  return (
    <S.Recommendations>
      <S.TitleContainer>
        <S.Title>You May Also Like</S.Title>
      </S.TitleContainer>
      <S.ProductList>
        {recommendedProductList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </S.ProductList>
    </S.Recommendations>
  );
};

export default Recommendations;
