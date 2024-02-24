import express from'express';
import cartController from './cartController.js'

const cartRouter = express.Router();
const CartController = new cartController();
cartRouter.delete('/:id', CartController.delete);
cartRouter.post('/', CartController.add);
cartRouter.get('/', CartController.get);
export default cartRouter;