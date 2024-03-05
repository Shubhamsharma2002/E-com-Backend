
import CartItemsRepo from "./car-repo.js";
import CartItemModel from "./cartModels.js";

export  default class CartItemsController {
            constructor(){
                this.cartItemsRepo = new CartItemsRepo();
            }
    
  async  add(req, res){
            try {
                const {productID, quantity} = req.body;
                const userID = req.userID;
                await this.cartItemsRepo.add(productID, userID,quantity);
               
                res.status(201).send('cart is updated');
            } catch (err) {
                console.log(err);
               return res.status(200).send("Something Went wrong");
            }

       
    }

   async get(req, res){
          try {
            const userID = req.userID;
            const items = this.cartItemsRepo.get(userID);
            return res.status(200).send(items);
          } catch (err) {
            console.log(err);
            return res.status(200).send("Something Went wrong");
          }
        
    }

   async delete(req, res){
         const userID = req.userID;
         const cartItemID = req.params.id;
         const deleted = await this.cartItemsRepo.delete(
            userID,
            cartItemID
         );
         if(!deleted){
            return res.status(404).send("item not found");
         }
         return res.status(200).send('cart item removed');
    }
}