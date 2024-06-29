// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import * as S from './Footer.styled';
import { useUserState } from '../../Providers/UserProvider';
import PlatformFlag from '../PlatformFlag/PlatformFlag';

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { currentUser } = useUserState();

  return (
    <S.Footer>
      <div>
        <p>
          This website is hosted for demo purpose only. It is not an actual
          shop.
        </p>
        <p>
          <span>session-id: {currentUser?.id}</span>
        </p>
      </div>
      <p>
        @ {currentYear} OpenTelemetry (
        <a href="https://github.com/open-telemetry/opentelemetry-demo">
          Source Code
        </a>
        )
      </p>
      <PlatformFlag />
    </S.Footer>
  );
};

export default Footer;
