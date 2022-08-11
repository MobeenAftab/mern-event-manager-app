import { Router } from 'express';
import workoutRouter from './workout/workout';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.send('hello World!');
});

indexRouter.get('/throw-err', (req, res, next) => {
  try {
    throw new Error('Hello Error!');
  } catch (error) {
    next(error);
  }
});

indexRouter.use('/workout', workoutRouter);
export default indexRouter;
