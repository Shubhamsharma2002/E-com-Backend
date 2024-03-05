import  {ObjectId}  from "mongodb";
import { getDB } from "../../config/mongodb.js";
import  {ApplicationError}  from "../../errorhandler/application-error-handler.js";

export default  class CartItemsRepo{
   constructor(){
    this.collection = "cartitems";
   }

   async add(productID, userID, quantity){
        try {
               const db = getDB();
               const collection = db.collection(this.collection);
            //    const id = await this.getNextCounter(db);

            //    await collection.updateOne(
            //     {productID:new ObjectId(productID), userID:new ObjectId(userID)},
            //     {
            //         $setOnInsert:{_id:id},
            //         $inc:{quantity:quantity}
            
            
            // },{upsert:true}
            //    )
               await collection.insertOne({productID:new ObjectId(productID), userID:new ObjectId(userID), quantity})
        } catch (err) {
               console.log(err);
               throw new ApplicationError("something went wrong with the database", 500);
        }
           
   }


   async get (userID){
       try {
               const db = getDB();
               const collection = db.collection(this.collection);
             return  await  collection.find({userID:new ObjectId(userID)}).toArray();
       } catch (err) {
               console.log(err);
               throw new ApplicationError("something went wrong with the database", 500);
       }
   }


   async delete(userID,cartItemID){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
           const result = await collection.deleteOne({_id:new ObjectId(cartItemID), userID:new ObjectId(userID)});
           return result.deletedCount>0;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with the database", 500);
        }
   }

//    async getNextCounter(db){
//     const resultDocument = await db.collection("counter").findOneAndUpdate(
//         {_id:'cartItemID'},
//         {$inc:{value:1}},
//         {returnDocument:'after'}
//     )
//     console.log(resultDocument);
//     return resultDocument.value.value;
//    }
}