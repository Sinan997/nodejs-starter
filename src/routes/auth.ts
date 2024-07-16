import { Router } from 'express';
import { loginController, refreshTokenController } from '../controllers/auth';
import { validateLoginBody, validateLogoutBody } from '../middlewares/validators/auth';

const router = Router();

router.post('/login', validateLoginBody, loginController);

router.post('/refresh-token', validateLogoutBody, refreshTokenController);

export default router;
