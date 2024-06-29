// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './Recommendations.styled';
import { useUserState } from '../../Providers/UserProvider';
import ApiGateway from '../../gateways/Api.gateway';

const Recommendations = () => {
  const { currentUser, token } = useUserState();

  const { data: recommendedProductList = [] } = useQuery({
    queryKey: ['recommendations', currentUser?.id],
    queryFn: () => ApiGateway.listRecommendations(token!),
    refetchOnWindowFocus: false,
    enabled: !!token,
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
