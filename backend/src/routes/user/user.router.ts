import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user.controller';
import { authenticateToken } from '../../middleware/authentication.middleware';
import { checkIfUserExists } from '../../middleware/user.middleware';

const router = Router();

router.post('/', checkIfUserExists, createUser);

router.get('/', authenticateToken, getUsers);

router.get('/:id', getUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
