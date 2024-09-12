export class ApiRequestError extends Error {
  message: string;

  statusCode: number;

  apiErrorCode: string | null;

  constructor(
    statusCode: number,
    message: string,
    apiErrorCode: string | null,
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.apiErrorCode = apiErrorCode;
  }
}

export function isApiRequestError(err: any): err is ApiRequestError {
  return err instanceof ApiRequestError;
}
