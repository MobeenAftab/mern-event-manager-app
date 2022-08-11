import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header('Content-Type', 'application/json');
  const status = req.statusCode || 400;
  console.log(`error ${status}`);
  res.status(status).json({
    handler: 'errorHandler',
    name: err.name,
    err: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
