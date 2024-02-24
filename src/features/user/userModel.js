

// export default class UserModel{
//     constructor(name, email, password, type){
//         this.email = email;
//         this.name = name;
//         this.password = password;
//         this.type = type;
//     }
//     static Signup(name, email, password, type){
//         const newUser = new UserModel(
//             name,
//             email,
//             password,
//             type
//         );
//         users.push(newUser);
//         return newUser;
//     }

import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/application-error-handler.js";

//     static SignIn(email, password){
//         const user = users.find(u => u.email == email && u.password == password);
//         return user;
//     }
// } 

// var users =[
//     {
//       name:'Admin user',
//       email:'admin@ecom.com',
//       password:'1234',
//       type:'seller'
// },
// {
//     name:'seller user',
//     email:'seller@ecom.com',
//     password:'1234',
//     type:'seller'
// },

// ]



export default class UserModel {
    constructor(name, email, password, type, id) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.type = type;
      this._id = id;
    }
  
  //  static async SignUp(name, email, password, type) {
  //     try {
  //       //  1. get the database name
  //       const db =  getDB();
  //     // 2 . get the collection 
  //     const collection = db.collection("user");
  //     const newUser = new UserModel(
  //       name,
  //       email,
  //       password,
  //       type
  //     );
  //     //  3. insert the document
  //   await  collection.insertOne(newUser)
  //   console.log(newUser);
  //   return newUser;
  //     } catch (err) {
  //        throw new ApplicationError("some went wrong guys ", 500)
  //     }
      
      
      
  //   }
  
    // static SignIn(email, password) {
    //   const user = users.find(
    //     (u) =>
    //       u.email == email && u.password == password
    //   );
    //   return user;
    // }

    static getAll(){
      return users;
    }
  }
  
  let users = [
    {
      id: 1,
      name: 'Seller User',
      email: 'seller@ecom.com',
      password: 'Password1',
      type: 'seller',
    },
    {
      id: 2,
      name: ' User',
      email: 'customer@ecom.com',
      password: 'Password1',
      type: 'customer',
    },
  ];
  