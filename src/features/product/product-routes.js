// mangae routes 


import express from'express';
import ProductController from './product-controller.js'
import {upload}  from '../../middleware/fileUpload-midleware.js'
const router = express.Router();
const productController = new ProductController();
router.post('/rate', productController.rateProduct);
router.get('/filter', productController.filterProduct);
router.get('/', productController.getAllProduct);
router.post('/', 
upload.single('imgUrl'),
productController.addProduct);
router.get('/:id', productController.getOneProduct);

export default router;