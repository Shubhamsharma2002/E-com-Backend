import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/application-error-handler.js";

class Userrepo {
     async SignUp(newUser) {
        try {
          //  1. get the database name
          const db =  getDB();
        // 2 . get the collection 
        const collection = db.collection("user");
        
        //  3. insert the document
      await  collection.insertOne(newUser)
      console.log(newUser);
      return newUser;
        } catch (err) {
          console.log(err);
           throw new ApplicationError("some went wrong guys ", 500)
        }
    } 
    



    async findByEmail(email) {
      try {
        //  1. get the database name
        const db =  getDB();
      // 2 . get the collection 
      const collection = db.collection("user");
      
      //  3. find the user
       return await  collection.findOne({email});
    
      } catch (err) {
        console.log(err);
         throw new ApplicationError("some went wrong guys ", 500)
      }
  }
    
  //   async signIn(email , password) {
  //     try {
  //       //  1. get the database name
  //       const db =  getDB();
  //     // 2 . get the collection 
  //     const collection = db.collection("user");
      
  //     //  3. find the user
  //      return await  collection.findOne({email, password});
    
  //     } catch (err) {
  //       console.log(err);
  //        throw new ApplicationError("some went wrong guys ", 500)
  //     }
  // } 


  
}

export default Userrepo;