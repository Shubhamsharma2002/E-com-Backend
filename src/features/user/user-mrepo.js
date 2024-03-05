import mongoose from "mongoose";
import {userSchema} from './userSchema.js'
import { ApplicationError } from "../../errorhandler/application-error-handler.js";
const UserModel = mongoose.model('User', userSchema);

// 
export default class UserRepo{
    async resetPassword(userID, hashPassword){
        try {
               console.log(userID)
              let user = await UserModel.findById(userID);
              console.log(user);
              if(user){
                user.password = hashPassword;
                user.save();
              }else{
                throw new Error("No  such user found")
              }
              
        } catch (err) {
            console.log(err);
            throw new ApplicationError("some went wrong guys ", 500)
        }
    }

    // async resetPassword(userID, hashPassword){
    //     try{
    //         let user = await UserModel.findById(userID);
    //         if(user){
    //             user.password=hashPassword;
    //             user.save();
    //         }
    //         else{
    //             throw new Error("No such user found");
    //         }
            
    //     } catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }
    
    async SignUp(user){
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {

            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
                console.log(err);
                throw new ApplicationError("some went wrong guys ", 500)
            }
            
        }
    }


    async signIn(email, password){
        try {
            return await UserModel.findOne({email, password});
        } catch (err) {
            console.log(err);
           throw new ApplicationError("some went wrong guys ", 500)
        }
    }



    async findByEmail(email) {
        try {
        
         return await  UserModel.findOne({email});
      
        } catch (err) {
          console.log(err);
           throw new ApplicationError("some went wrong guys ", 500)
        }
    }
}



