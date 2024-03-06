import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/application-error-handler.js";
import mongoose from 'mongoose';
import { productSchema } from './productSchema.js';
import { reviewSchema } from './review-schema.js';
import { categorySchema } from './categorySchema.js';
 const productModel = mongoose.model('Product', productSchema);
 const reviewModel = mongoose.model('Review', reviewSchema);
 const CategoryModel = mongoose.model('Category', categorySchema);
class productRepo{
          async add( productdata){
                    try {
                          const newproduct = new productModel(productdata);
                          productdata.categories=productdata.category.split(',').map(e => e.trim());
                          console.log(productdata)
                          const savedproduct = await newproduct.save();

                          await CategoryModel.updateMany(
                            {_id:{$in:productdata.categories}},
                            {$push:{products:new ObjectId(savedproduct._id)}}
                          )
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
                
                const productToupdate = await productModel.findById(productID);
                if(!productToupdate){
                      throw new Error("product not found");
                }

                const userReview = await reviewModel.findOne({product : new ObjectId(productID), user:new ObjectId(userID)})
                 if(userReview){
                    userReview.rating= rating;
                    await userReview.save();
                 }else{
                    const newreview = new reviewModel({
                        product: new ObjectId(productID),
                        user: new ObjectId(userID),
                        rating:rating
                    })
                    newreview.save();
                 }
    
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
}
 export default productRepo