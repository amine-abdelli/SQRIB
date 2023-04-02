import { log } from '@sqrib/shared';
import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  httpStatusCode;

  timestamp;

  constructor(httpStatusCode: number, message: string) {
    if (message) {
      super(message);
    } else {
      super('A generic error occurred!');
    }

    // initializing the class properties
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();

    // attaching a call stack to the current class,
    // preventing the constructor call to appear in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // default HTTP status code and error message
  let httpStatusCode = 500;
  let message = 'Internal Server Error';

  // if the error is a custom defined error
  if (err instanceof HttpError) {
    httpStatusCode = err.httpStatusCode;
    message = err.message;
  }
  if (process.env.NODE_ENV !== 'production') {
    // since in JavaScript you can also
    // directly throw strings
    if (typeof err === 'string') {
      message = err;
    } else if (err instanceof Error) {
      message = err.message;
    }
  }

  let stackTrace;

  // return the stack trace only when
  // developing locally or in stage
  if (process.env.NODE_ENV !== 'production') {
    stackTrace = err.stack;
  }

  // logg the error
  log.error(`[${httpStatusCode}] ${message}`);

  // return the standard error response
  res.status(httpStatusCode).send({
    error: {
      message,
      timestamp: new Date().toISOString() || undefined,
      stackTrace,
    },
  });

  next(err);
}
