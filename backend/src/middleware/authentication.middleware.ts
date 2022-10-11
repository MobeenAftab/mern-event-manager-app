import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

/**
 * Verify JWT token for protected routes.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      (
        req.headers['authorization'] || req.headers['Authorization']
      ).toString() ?? '';

    if (!authHeader.startsWith('Bearer ')) {
      return res.send(401).json({ msg: 'Malformed token' });
    }
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
      return res.send(401).json({ msg: 'Token not found in request body' });
    }

    verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: 'Failed to decode token' });
      }
      req.body.id = decoded.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
