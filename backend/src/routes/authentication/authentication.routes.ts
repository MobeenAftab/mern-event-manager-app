import { Router } from 'express';
import { logIn } from '../../controllers/authentication.controller';

const router = Router();

router.get('', logIn);

export default router;
