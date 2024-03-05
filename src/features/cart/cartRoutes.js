import express from'express';
import cartController from './cartController.js'

const cartRouter = express.Router();
const CartController = new cartController();
cartRouter.delete('/:id', 

(req, res, next)=>{
    CartController.delete(req,res,next)
     
}

);
cartRouter.post('/', (req, res, next)=>{
     CartController.add(req,res,next)
      
});
cartRouter.get('/',(req, res, next)=>{
    CartController.get(req,res,next)
     
});
export default cartRouter;