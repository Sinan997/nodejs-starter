import { Router } from 'express';
import { loginController, logoutController, refreshTokenController } from '../controllers/auth';
import { validateLoginBody, validateLogoutBody } from '../middlewares/validators/auth';

const router = Router();

router.post('/login', validateLoginBody, loginController);

router.post('/logout', validateLogoutBody, logoutController);

router.post('/refresh-token', validateLogoutBody, refreshTokenController);

export default router;
