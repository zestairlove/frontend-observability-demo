// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET': {
      return res.status(400).json({ message: 'Bad Request' });
    }

    default: {
      return res.status(405).send('Method not allowed');
    }
  }
};

export default handler;
