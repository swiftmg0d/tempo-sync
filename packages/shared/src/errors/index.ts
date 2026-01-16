import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class GenericError extends Error {
  status: ContentfulStatusCode;
  message: string;

  constructor(status: ContentfulStatusCode, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    this.name = 'GenericError';
    Object.setPrototypeOf(this, GenericError.prototype);
  }
}

export class FetchError extends GenericError {
  constructor(status: ContentfulStatusCode, message: string) {
    super(status, message);
    this.name = 'FetchError';
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}

export class DatabaseError extends GenericError {
  constructor(status: ContentfulStatusCode, message: string) {
    super(status, message);
    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class PromptError extends GenericError {
  constructor(status: ContentfulStatusCode, message: string) {
    super(status, message);
    this.name = 'PromptError';
    Object.setPrototypeOf(this, PromptError.prototype);
  }
}
