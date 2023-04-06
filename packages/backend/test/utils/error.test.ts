import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../src/middlewares/error.middleware';
import { HttpError } from '../../src/utils';

describe('HttpError', () => {
  test('Should create HttpError instance with custom message and status code', () => {
    const statusCode = 400;
    const message = 'Bad Request';
    const error = new HttpError(statusCode, message);

    expect(error).toBeInstanceOf(HttpError);
    expect(error.httpStatusCode).toBe(statusCode);
    expect(error.message).toBe(message);
  });

  test('Should create HttpError instance with default message', () => {
    const statusCode = 500;
    const error = new HttpError(statusCode, 'An unexpected error occurred !');

    expect(error).toBeInstanceOf(HttpError);
    expect(error.httpStatusCode).toBe(statusCode);
    expect(error.message).toBe('An unexpected error occurred !');
  });
});

describe('errorHandler', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  test('Should handle custom HttpError', () => {
    const statusCode = 400;
    const message = 'Bad Request';
    const error = new HttpError(statusCode, message);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message,
          timestamp: expect.any(String),
          stackTrace: expect.any(String),
        }),
      }),
    );
    expect(next).toHaveBeenCalledWith(error);
  });

  test('Should handle generic Error', () => {
    const error = new Error('Some generic error');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message: 'Internal Server Error',
          timestamp: expect.any(String),
          stackTrace: expect.any(String),
        }),
      }),
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});
