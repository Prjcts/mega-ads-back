import { Request, Response, NextFunction } from 'express';

class ValidationError extends Error {}

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(err instanceof ValidationError ? 400 : 500).json({
    message: err instanceof ValidationError ? err.message : 'Try agan later',
  });
};
export { handleError, ValidationError };
