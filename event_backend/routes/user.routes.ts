import { Router } from 'express';
import { AuthController } from '../controller/user.controller';

const authController = new AuthController();
const router = Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;