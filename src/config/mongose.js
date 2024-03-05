import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.DB_URL;

export const moongooseconnection = async() =>{
    try {
        await mongoose.connect(url, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('moongose connected')
    } catch (err) {
        console.log('erro with moonoogese')
        console.log(err);
    }
}