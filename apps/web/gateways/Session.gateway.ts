// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { UserPayload } from '@repo/types';
import { v4 } from 'uuid';
import request from '../utils/request';

interface ISession {
  userId: string;
}

const sessionKey = 'session';
const defaultSession = {
  userId: v4(),
};

const FRONTEND_ADDR = process.env.FRONTEND_ADDR || 'http://localhost:3000';
const basePath = `${typeof window === 'undefined' ? FRONTEND_ADDR : ''}/api`;

const SessionGateway = () => ({
  getCurrentUser() {
    return request<{ currentUser: UserPayload }>({
      url: `${basePath}/admin/current-user`,
    });
  },
  signIn() {
    return request<UserPayload>({
      url: `${basePath}/admin/signin`,
    });
  },
  getSession(): ISession {
    if (typeof window === 'undefined') return defaultSession;
    const sessionString = localStorage.getItem(sessionKey);

    if (!sessionString)
      localStorage.setItem(sessionKey, JSON.stringify(defaultSession));

    return JSON.parse(
      sessionString || JSON.stringify(defaultSession)
    ) as ISession;
  },
  setSessionValue<K extends keyof ISession>(key: K, value: ISession[K]) {
    const session = this.getSession();

    localStorage.setItem(
      sessionKey,
      JSON.stringify({ ...session, [key]: value })
    );
  },
});

export default SessionGateway();
