import { Router } from 'express';

import { UserControllers } from './controllers/UserControllers';

const router = Router();

const userControllers = new UserControllers();

router.post('/sign-up', userControllers.create);
router.post('/sign-in', userControllers.login);

export { router };
