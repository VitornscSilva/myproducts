import express from 'express';

import ProductController from '../app/controllers/ProductController';

const router = express.Router();

router.get('/health', ProductController.health);
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.delete('/products/:id', ProductController.delete);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);

export default router;
