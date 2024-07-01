// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty, AuthPayload } from '@repo/types';
import request from '../../../../utils/request';
import { ApiError } from '../../../../utils/errors/ApiError';
import { getErrorMessage } from '../../../../utils/errors/getErrorMessage';

type TResponse = AuthPayload | Empty;

const ADMIN_API_ADDR = process.env.ADMIN_API_ADDR || 'http://localhost:3001';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  switch (req.method) {
    case 'GET': {
      try {
        const headerAuthValue = req.headers.authorization;
        const result = await request<AuthPayload>({
          url: `${ADMIN_API_ADDR}/current-user`,
          headers: {
            'content-type': 'application/json',
            ...(headerAuthValue ? { authorization: headerAuthValue } : {}),
          },
        });
        return res.status(200).json(result);
      } catch (err) {
        if (err instanceof ApiError) {
          return res.status(err.statusCode).json({ message: err.message });
        }
        return res
          .status(500)
          .json({ message: `${req.url} ${getErrorMessage(err)}` });
      }
    }

    default: {
      return res.status(405).send('Method not allowed');
    }
  }
};

export default handler;
