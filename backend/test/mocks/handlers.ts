import { rest } from 'msw';
import {
  userOne,
  userOneDelete,
  userOneEdit,
  users,
} from '../fixtures/users.mock.data';
import {
  deleteWorkoutOne,
  workoutOne,
  workoutOneEdit,
  workouts,
} from '../fixtures/workout.mock.data';

const BASE_URL = process.env.VITE_BASE_URL;
const WORKOUTS_URL = 'workouts';
const USERS_URL = 'users';

export const WorkoutHandlers = [
  rest.get(`${BASE_URL}/${WORKOUTS_URL}/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workouts));
  }),
  rest.get(`${BASE_URL}/${WORKOUTS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOne));
  }),
  rest.post(`${BASE_URL}/${WORKOUTS_URL}/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOne));
  }),
  rest.patch(`${BASE_URL}/${WORKOUTS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOneEdit));
  }),
  rest.delete(`${BASE_URL}/${WORKOUTS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(deleteWorkoutOne));
  }),
];

export const userHandlers = [
  rest.get(`${BASE_URL}/${USERS_URL}/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get(`${BASE_URL}/${USERS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userOne));
  }),
  rest.post(`${BASE_URL}/${USERS_URL}/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userOne));
  }),
  rest.patch(`${BASE_URL}/${USERS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userOneEdit));
  }),
  rest.delete(`${BASE_URL}/${USERS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userOneDelete));
  }),
];

export const handlers = [...WorkoutHandlers, ...userHandlers];
