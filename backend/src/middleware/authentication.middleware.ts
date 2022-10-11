import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'].toString();
    if (!authHeader?.startsWith('Bearer ')) {
      return res.send(401).json({ msg: 'Malformed token' });
    }
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
      return res.send(401).json({ msg: 'token not found in request body' });
    }

    await verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next(err);
      }
      req.body.userId = decoded.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
