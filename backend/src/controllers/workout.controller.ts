import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { IWorkout, WorkoutModel } from '../models/workout.model';

export const getWorkouts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workouts: Array<IWorkout> = await WorkoutModel.find({}).sort({
      createdAt: -1,
    });

    if (workouts.length >= 1) {
      res.status(200).json({
        workouts,
      });
    } else {
      res.status(404).json({
        msg: 'No workouts found.',
        workouts: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout: IWorkout = await WorkoutModel.findById(id);
      res.status(200).json({
        workout,
      });
    } else {
      const workout: IWorkout = await WorkoutModel.findOne(req.body);
      res.status(200).json({
        workout,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newWorkout: IWorkout = new WorkoutModel({ ...req.body });
    const workout: IWorkout = await WorkoutModel.create(newWorkout);

    res.status(200).json({
      workout,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkout = async (
  req: Request,
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
          error: 'No such workout ID',
          id,
        });
      }
      res.status(200).json({
        workout,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout: IWorkout = await WorkoutModel.findByIdAndDelete({
        _id: id,
      });
      if (!workout) {
        return res.status(404).json({
          error: 'No such workout ID',
          id,
        });
      }
      res.status(200).json({
        msg: 'Workout deleted',
        workout,
      });
    }
  } catch (error) {
    next(error);
  }
};
