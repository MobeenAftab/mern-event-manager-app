import { Router } from 'express';
import {
  authRefreshToken,
  logIn,
  logOut,
} from '../../controllers/authentication.controller';

const router = Router();

router.get('/', logIn);
router.get('/logout', logOut);
router.get('/refresh-token', authRefreshToken);

export default router;
