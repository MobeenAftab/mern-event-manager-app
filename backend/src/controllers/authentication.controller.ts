import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { IAuthenticatedUser } from '../models/token.model';
import { generateToken } from './token.controller';
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

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

        // await saveToken(refreshToken);

        return { user, accessToken, refreshToken };
      }
    }
  } catch (error) {
    return error;
  }
};
