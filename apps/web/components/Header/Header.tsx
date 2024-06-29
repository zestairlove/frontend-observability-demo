// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@repo/ui/Button';
import * as S from './Header.styled';
import { useUserState, useUserDispatch } from '../../Providers/UserProvider';
import SessionGateway from '../../gateways/Session.gateway';

const Header = () => {
  const { currentUser } = useUserState();
  console.log('currentUser in header', currentUser);
  const userDispatch = useUserDispatch();
  const { data, refetch } = useQuery({
    queryKey: ['signin'],
    queryFn: SessionGateway.signIn,
    enabled: false,
  });

  console.log('sigin data in Header', data);

  useEffect(() => {
    if (data) {
      userDispatch({
        currentUser: data.user,
      });
    }
  }, [data]);

  return (
    <S.Header>
      <S.NavBar>
        <S.Container>
          <S.NavBarBrand href="/">
            <S.BrandImg />
          </S.NavBarBrand>
          <S.Controls>
            {currentUser && currentUser.email}
            <Button onClick={() => refetch()}>Signin</Button>
          </S.Controls>
        </S.Container>
      </S.NavBar>
    </S.Header>
  );
};

export default Header;
