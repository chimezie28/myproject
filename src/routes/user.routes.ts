import { Router } from 'express';
import { forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);

export default router;

