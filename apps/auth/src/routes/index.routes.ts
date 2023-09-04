import express from 'express';

import AuthController from '../app/controllers/AuthController';

const router = express.Router();

router.get('/auth', AuthController.index);
router.get('/auth/:id', AuthController.show);
router.post('/auth/signin', AuthController.signIn);
router.post('/auth/register', AuthController.store);

export default router;
