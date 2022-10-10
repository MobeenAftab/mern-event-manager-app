import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { IUser, User } from '../models/user.model';

/**
 * Should the return type of each user here be using the mongoose HydratedDocument?
 */

const options = { new: true };

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user: IUser = await User.findById(id);
      res.status(200).json({
        user,
      });
    } else {
      const user: IUser = await User.findOne(req.body);
      res.status(200).json({
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = new User({ ...req.body });
    user.password = await bcrypt.hash(user.password, 10);

    return await User.create(user);
  } catch (error) {
    return next(error);
  }
};

// Current behaviour will overwrite password field and save as plain text.
// Need to find a way to detect password updates and add a new flow to handle this process.
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user: IUser = new User({ ...req.body });

      const userDoc = await User.findOneAndUpdate(
        { _id: id },
        { user },
        { returnDocument: 'after' }
      );
      if (!user) {
        return res.status(404).json({
          error: 'No such user ID',
          id,
        });
      }
      res.status(200).json({
        userDoc,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user: IUser = await User.findByIdAndDelete({
        _id: id,
      });
      if (!user) {
        return res.status(404).json({
          error: 'No such user ID',
          id,
        });
      }
      res.status(200).json({
        msg: 'User deleted',
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Admin Routes
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: Array<IUser> = await User.find({}).sort({
      createdAt: -1,
    });

    if (user.length >= 1) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404).json({
        msg: 'No users found.',
        user: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Helper / Utility functions

export const getUserById = async (userId: string | Types.ObjectId) => {
  try {
    if (userId) {
      return await User.findById(userId);
    }
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    if (email) {
      return await User.findOne({ email: email });
    }
  } catch (error) {
    return error;
  }
};
