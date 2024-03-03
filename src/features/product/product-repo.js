import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/application-error-handler.js";

class productRepo{
          async add( newProduct){
                    try {
                          const db = getDB();
                          const collection = db.collection("products");
                          await collection.insertOne(newProduct);
                          return newProduct;
                    } catch (err) {
                        console.log(err);
                        throw new ApplicationError("some went wrong guys ", 500)
                    }
          }

         async getAll(){
                        try {
                              const db = getDB();
                              const collection = db.collection("products")
                              return  await collection.find().toArray();
                        } catch (err) {
                            throw new ApplicationError("some went wrong guys ", 500)
                        }
          }

         async get(id){
            try {
                const db = getDB();
                const collection = db.collection("products");
                return  await collection.findOne({_id: new ObjectId(id)});
            } catch (err) {
                throw new ApplicationError("some went wrong guys ", 500)
            }

          }

          async filter(minPrice, maxPrice, category){
            try{
                   const db = getDB();
                   const collection = db.collection("products")
                    let filterExpression={};
                    if(minPrice){
                        filterExpression.price = {$gte: parseFloat(minPrice)}
                    }if(maxPrice){
                        filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)}
                    }if(category){
                        filterExpression.category = category
                    }
                   return collection.find(filterExpression).toArray();
            }catch (err) {
                throw new ApplicationError("some went wrong guys ", 500)
            }
          }
        async  rate(userID, productID, rating){
            try{
                const db = getDB();
                const collection = db.collection("products");

                const product = await collection.findOne({_id:new ObjectId(productID)});

                const userRating = product?.ratings?.find(r => r.userID == userID);
                if(userRating){
                    await collection.updateOne({
                        _id: new ObjectId(productID),"rating.userID":new ObjectId(userID)
                    },{
                        $set:{
                            "rating.$.rating":rating
                        }
                    })
                }else{
                    await  collection.updateOne({
                        _id:new ObjectId(productID)
                    },{
                        $push: {ratings: {userID:new ObjectId(userID), rating}}
                    })
                }
             
    
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
}
 export default productRepo