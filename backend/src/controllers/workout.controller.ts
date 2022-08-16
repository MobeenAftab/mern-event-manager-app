import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { IWorkout, WorkoutModel } from '../models/workout.model';
/**
 * TODO:
 *  Can refactor this file to remove the custom request interface and
 *    assign the body to the IWorkout interface.
 *
 *  Lots fo repeated code, can refactor the common code blocks like checking
 *    if id is valid as pre hook virtuals on the workout model.
 */

export interface CustomRequest<T> extends Request {
  body: T;
}

export const getWorkouts = async (
  req: CustomRequest<IWorkout>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      msg: 'GET: getWorkouts',
      workouts,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkout = async (
  req: CustomRequest<IWorkout>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await WorkoutModel.findById(req.params.id);
      res.status(200).json({
        msg: 'GET: getWorkout',
        workout,
      });
    } else {
      const workouts = await WorkoutModel.find(req.body).sort({
        createdAt: -1,
      });
      res.status(200).json({
        msg: 'GET: getWorkout',
        workouts,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (
  req: CustomRequest<IWorkout>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workout = await WorkoutModel.create(req.body as IWorkout);
    res.status(200).json({
      msg: 'POST: workout',
      workout,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkout = async (
  req: CustomRequest<IWorkout>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await WorkoutModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnDocument: 'after' }
      );
      if (!workout) {
        return res.status(404).json({
          msg: 'PATHC: updateWorkout',
          error: 'No such workout ID',
        });
      }
      res.status(200).json({
        msg: 'PATHC: updateWorkout',
        workout,
      });
    } else {
      return res.status(404).json({
        msg: 'PATHC: updateWorkout',
        error: 'No such workout ID',
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (
  req: CustomRequest<IWorkout>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await WorkoutModel.findByIdAndDelete({ _id: id });
      if (!workout) {
        return res.status(404).json({
          msg: 'DELETE: deleteWorkout',
          error: 'No such workout ID',
        });
      }
      res.status(200).json({
        msg: 'DELETE: deleteWorkout',
      });
    } else {
      return res.status(404).json({
        msg: 'DELETE: deleteWorkout',
        error: 'No such workout ID',
      });
    }
  } catch (error) {
    next(error);
  }
};
