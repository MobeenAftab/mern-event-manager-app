import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IDecodedToken } from '../models/token.model';

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
    // TODO: If no auth header is found will throw error on undefined toString
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

    /**
     * If access token has expired from http header, should this middleware automatically
     * use refresh token from cookie to generate a new access token?
     *
     * Revoke AC token if expired.
     */
    verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded: IDecodedToken) => {
        if (err) {
          return res.status(403).json({ msg: 'Failed to decode token' });
        }
        req.body.id = decoded.userId;
        req.body.email = decoded.email;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};
