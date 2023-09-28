import { Router } from 'express';
import { userRouter } from './api/v1/user';

const router: Router = Router();

router.use('/auth', userRouter);

export const MainRouterV1: Router = router;
