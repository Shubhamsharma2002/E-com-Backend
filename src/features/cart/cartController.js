import CartItemModel from "./cartModels.js";

export  default class CartItemsController {
    add(req, res){
        const {productID, quantity} = req.query;
        const userID = req.userID;
       CartItemModel.add(productID, userID,quantity);
       
        res.status(201).send('cart is updated');
    }

    get(req, res){
        const userID = req.userID;
        const items = CartItemModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req, res){
         const userID = req.userID;
         const cartItemID = req.params.id;
         const error = CartItemModel.delete(
            cartItemID,
            userID
         );
         if(error){
            return res.status(404).send(error);
         }
         return res.status(200).send('cart item removed');
    }
}
