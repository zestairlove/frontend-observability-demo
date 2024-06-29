// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getErrorMessage } from './errors/getErrorMessage';
import { ApiError } from './errors/ApiError';

interface IRequestParams {
  url: string;
  body?: object;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
}

const request = async <T>({
  url = '',
  method = 'GET',
  body,
  queryParams = {},
  headers = {
    'content-type': 'application/json',
  },
}: IRequestParams): Promise<T> => {
  let response;

  try {
    response = await fetch(
      `${url}?${new URLSearchParams(queryParams).toString()}`,
      {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers,
      }
    );
  } catch (err) {
    throw new Error(`Network Error: ${getErrorMessage(err)}}`, { cause: err });
  }

  if (response.ok) {
    try {
      const responseText = await response.text();
      return JSON.parse(responseText);
    } catch (err) {
      throw new Error(`Parse Error: ${getErrorMessage(err)}}`, {
        cause: err,
      });
    }
  } else {
    throw new ApiError({
      statusCode: response.status,
      message: response.statusText,
    });
  }
};

export default request;
