import { Router } from 'express';
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from '../../controllers/workout.controller';

const router = Router();

router.post('/', createWorkout);

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

export default router;
