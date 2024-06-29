// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './Recommendations.styled';
import { useUserState } from '../../Providers/UserProvider';
import ApiGateway from '../../gateways/Api.gateway';

const cookie = typeof window !== 'undefined' ? document.cookie : '';
console.log('cookie in Recommendations', cookie);

const Recommendations = () => {
  const { currentUser } = useUserState();
  const { data: recommendedProductList = [] } = useQuery({
    queryKey: ['recommendations', currentUser?.id],
    queryFn: () => ApiGateway.listRecommendations(currentUser!.id),
    refetchOnWindowFocus: false,
    enabled: !!currentUser?.id,
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
