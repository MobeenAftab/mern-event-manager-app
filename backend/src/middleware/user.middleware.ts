import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../controllers/user.controller';

export const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req?.body?.email;
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(303).json({
        msg: 'Account with that email already exists',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
