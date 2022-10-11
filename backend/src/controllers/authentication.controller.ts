import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IAuthenticatedUser, IDecodedToken } from '../models/token.model';
import {
  deleteRefreshToken,
  generateToken,
  saveToken,
} from './token.controller';
import { getUserByEmail } from './user.controller';

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const { user, accessToken, refreshToken } = await authenticateUser(
        email,
        password
      );

      if (user) {
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
        }); //secure: true, cannot secure unless sent over HTTPS

        res.status(200).json({
          user,
          accessToken,
          refreshToken,
        });
      } else {
        res.status(404).json({
          msg: 'Failed to authorise user.',
          user: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const authRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookies } = req.cookies;

    if (!cookies?.jwt) {
      return res.status(403).json({
        msg: 'Invalid Credentials',
      });
    }
    const refreshToken = cookies.jwt;
    verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ msg: 'Failed to decode token' });
        } else {
          const accessToken: IDecodedToken = await generateToken(
            decoded.userId,
            decoded.email,
            process.env.ACCESS_TOKEN_SECRET,
            '30m'
          );
          res.status(200).json({
            accessToken,
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({
        msg: 'Invalid credentials',
      });
    }
    const refreshToken = cookies.jwt;
    const tokenDoc = await deleteRefreshToken(refreshToken);

    if (tokenDoc) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
      });

      res.status(200).json({
        msg: 'Refresh token deleted, user has logged out',
      });
    } else {
      res.status(404).json({
        msg: 'Failed to logout, invalid credentials',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Helper / Utility functions

export const authenticateUser = async (
  email: string,
  password: string
): Promise<IAuthenticatedUser> => {
  try {
    if (email && password) {
      const user = await getUserByEmail(email).catch((error) => error);
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const { _id, email } = user;
        const accessToken = await generateToken(
          _id,
          email,
          process.env.ACCESS_TOKEN_SECRET,
          '30m'
        );

        const refreshToken = await generateToken(
          _id,
          email,
          process.env.REFRESH_TOKEN_SECRET,
          '1d'
        );

        await saveToken(refreshToken);

        return { user, accessToken, refreshToken };
      }
    }
  } catch (error) {
    return error;
  }
};
