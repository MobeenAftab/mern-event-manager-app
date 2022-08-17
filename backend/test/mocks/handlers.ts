import { rest } from 'msw';
import {
  deleteWorkoutOne,
  workoutOne,
  workoutOneEdit,
  workouts,
} from '../fixtures/workout.mock.data';

const BASE_URL = process.env.VITE_BASE_URL;

export const handlers = [
  rest.get(`${BASE_URL}/workouts/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workouts));
  }),
  rest.get(`${BASE_URL}/workouts/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOne));
  }),
  // rest.get(`${BASE_URL}/workouts/`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(workoutOne));
  // }),
  rest.post(`${BASE_URL}/workouts/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOne));
  }),
  rest.patch(`${BASE_URL}/workouts/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOneEdit));
  }),
  rest.delete(`${BASE_URL}/workouts/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(deleteWorkoutOne));
  }),
];
