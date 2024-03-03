// mangae routes 


import express from'express';
import ProductController from './product-controller.js'
import {upload}  from '../../middleware/fileUpload-midleware.js'
import jwtAuth from '../../middleware/jwtMidleware.js'
const router = express.Router();
const productController = new ProductController();
router.post(
    '/rate',jwtAuth,
    (req, res, next)=>{
      productController.rateProduct(req, res, next)
   }
  );
  
router.get('/filter', (req, res) =>{
    productController.filterProduct(req,res)
});
router.get('/', (req, res) =>{
    productController.getAllProduct(req,res)
});
router.post('/', 
upload.single('imgUrl'),
(req, res) =>{
    productController.addProduct(req,res)
});
router.get('/:id', (req, res) =>{
    productController.getOneProduct(req,res)
});

export default router;