import express from 'express'
import ProductController from '../Controllers/productController'

const router = express.Router();

// defining the routes

router.post('/add', ProductController.addProduct);
router.get('/', ProductController.getProduct);
router.get('/:id', ProductController.getProductById);
router.put('/update/:id', ProductController.updateProduct);
router.patch('/:id', ProductController.partialUpdateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

export default router;












