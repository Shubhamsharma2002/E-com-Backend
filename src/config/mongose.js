import mongoose from "mongoose";
import dotenv from 'dotenv';
import { categorySchema } from "../features/product/categorySchema.js";
dotenv.config();
const url = process.env.DB_URL;

export const moongooseconnection = async() =>{
    try {
        await mongoose.connect(url, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('moongose connected')
        addCategory();
    } catch (err) {
        console.log('erro with moonoogese')
        console.log(err);
    }
}

async function addCategory(){
    const CategoryModel = mongoose.model('Category', categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'}, {name:'electronic'}]);
    }
    console.log('category will be added')
}