// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { AuthPayload } from '@repo/types';
import request from '../utils/request';

const FRONTEND_ADDR = process.env.FRONTEND_ADDR || 'http://localhost:3000';
const basePath = `${typeof window === 'undefined' ? FRONTEND_ADDR : ''}/api`;

const SessionGateway = () => ({
  getCurrentUser(token?: string) {
    const headerAuth = { authorization: `Bearer ${token}` };
    return request<{ currentUser: AuthPayload }>({
      url: `${basePath}/admin/current-user`,
      headers: {
        'content-type': 'application/json',
        ...(token ? headerAuth : {}),
      },
    });
  },
  async signIn() {
    return await request<AuthPayload>({
      url: `${basePath}/admin/signin`,
    });
  },
});

export default SessionGateway();
