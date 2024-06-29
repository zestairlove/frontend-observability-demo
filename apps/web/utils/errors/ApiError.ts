type API_ERROR_NAME =
  | 'UnknownApiError'
  | 'BadRequest'
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'InternalServerError';

export class ApiError extends Error {
  name: API_ERROR_NAME;
  statusCode: number;

  constructor({ statusCode = 520, message = '', cause }: ApiErrorOptions) {
    super(message, { cause });
    this.statusCode = statusCode;
    this.name = 'UnknownApiError';

    switch (statusCode) {
      case 400:
        this.name = 'BadRequest';
        break;
      case 401:
        this.name = 'Unauthorized';
        break;
      case 403:
        this.name = 'Forbidden';
        break;
      case 404:
        this.name = 'NotFound';
        break;
      case 500:
        this.name = 'InternalServerError';
        break;
    }
  }
}

type ApiErrorOptions = {
  statusCode: number;
  message?: string;
  cause?: ErrorOptions['cause'];
};
