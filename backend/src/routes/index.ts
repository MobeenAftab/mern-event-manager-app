import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../middleware/swaggerUi';
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

indexRouter.use('/workouts', workoutRouter);

indexRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default indexRouter;
