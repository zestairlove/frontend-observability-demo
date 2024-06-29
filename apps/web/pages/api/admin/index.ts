// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Empty } from '@repo/types';
// import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';

type TResponse = string | Empty;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  return res.status(405).send('Method not allowed');
};

// export default InstrumentationMiddleware(handler);
export default handler;
