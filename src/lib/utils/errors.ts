export class ApiError extends Error {
  readonly response;

  constructor(response: Response) {
    super(response.statusText);
    this.name = 'ApiError';
    this.response = response;
  }
}
