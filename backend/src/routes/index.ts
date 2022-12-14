import { Router } from 'express';
import authenticationRouter from './authentication/authentication.routes';
import userRouter from './user/user.router';
import workoutRouter from './workout/workout.router';

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

indexRouter.use('/users', userRouter);
indexRouter.use('/workouts', workoutRouter);
indexRouter.use('/login', authenticationRouter);

export default indexRouter;
