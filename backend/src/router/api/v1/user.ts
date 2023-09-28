import { Router } from 'express';
import { usersRegister } from '../../../controllers/userController';
import * as validator from '../../../middleware/userValidator';

const router = Router();

router.post(
	'/register',
	validator.userRegisterValidator,
	usersRegister
);

export const userRouter: Router = router;
