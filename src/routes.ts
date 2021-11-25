import { Router } from 'express';

import { UserControllers } from './controllers/UserControllers';
import { LancheControllers } from './controllers/LancheController';

const router = Router();

const userControllers = new UserControllers();
const lancheControllers = new LancheControllers();

router.post('/sign-up', userControllers.create);
router.post('/sign-in', userControllers.login);
router.get('/hamburguerias', userControllers.getHamburguerias);

router.post('/lanche', lancheControllers.create);
router.get('/lanche/:id', lancheControllers.getLanchePorId);

export { router };
