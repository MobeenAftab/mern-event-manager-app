import { rest } from 'msw';
import { workoutOne } from '../fixtures/workout.mock.data';

export const handlers = [
  rest.get('http://localhost:3000/v1/workouts/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(workoutOne));
  }),
];
