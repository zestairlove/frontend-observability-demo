import type { NextApiResponse } from 'next';
import { ApiError } from './ApiError';
import { getErrorMessage } from './getErrorMessage';

export const handleApiError = (err: unknown, res: NextApiResponse) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: getErrorMessage(err) });
};
