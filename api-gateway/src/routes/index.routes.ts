import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';
import validateUser from '../app/middlewares/validateUser';
import JokeController from '../app/controllers/JokeController';
import ProductController from '../app/controllers/ProductController';
import AuthController from '../app/controllers/AuthController';

const router = Router();

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);

router.get('/auth', AuthController.index);
router.get('/auth/:id', AuthController.show);
router.post('/auth/signin', AuthController.signIn);
router.post('/auth/register', AuthController.store);

router.get('/jokes', JokeController.show);


router.use(authMiddleware);
router.use(validateUser);

router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

export default router;
