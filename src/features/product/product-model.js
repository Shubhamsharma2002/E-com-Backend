import { ApplicationError } from "../../errorhandler/application-error-handler.js";
import UserModel from "../user/userModel.js"
export default class ProductModel {
    constructor( name, desc, imgUrl , category, price, size,id){
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.imgUrl = imgUrl;
        this.category = category;
        this.price = price;
        this.size = size;
    }
    static add(product){
      // product.id= products.length+ 1;
      // products.push(product);
      // return product;
    }

    static get(id){
      const product = products.find(
        (i) => i.id == id
      );
      return product;
    }
    static getAll(){
       return products;
    }

    static filter(minprice, maxprice, id){
      // const result = products.filter((product) =>{
      //   return(
      //      product.price >= minprice &&
      //      product.price <= maxprice  &&
      //      product.name  == category
      //   )
      // });
      // console.log(result);
      //  return result;

      const result = products.filter((product) =>{
          return(
            product.price>=minprice&&
            product.price<=maxprice&&
            product.id == id
          );
      });
      console.log(result);
      return result;
    }

    static rateProduct(userID, productID,rating){
      // validate user or product
    const user =   UserModel.getAll().find( (u) => u.id == userID);
      if(!user){
       throw new ApplicationError ("user not found", 404);
      }

      // validate product 

     const product =  products.find(p => p.id == productID);

     if(!product){
      throw new ApplicationError('product not found', 404);
     }

    //  check if there are any rating and if not then add rating array.
    
    if(!product.ratings){
      product.ratings = [];
      product.ratings.push({
        userID:userID,
        rating:rating,
      });
    } else{
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userID == userID
      );
      if(existingRatingIndex >=0){
        product.ratings[existingRatingIndex] = {
          userID:userID,
          rating:rating,
        };
      }
      else{
        product.ratings.push({
          userID:userID,
          rating:rating,
        })
      }
    }
    

    }
}


let products =[
      new ProductModel(
        1,
        'product 1',
        'decsription of product',
        10.00,
        'imgurl'
      ),
      new ProductModel(
        2,
        'product 2',
        'decsription of product',
        20.89,
        'imgurl'
      ),
      new ProductModel(
        3,
        'product 3',
        'decsription of product',
        20.89,
        'imgurl'
      ),new ProductModel(
        4,
        'product 4',
        'decsription of product',
        20.89,
        'imgurl'
      ),new ProductModel(
        4,
        'shubham',
        'decsription of product',
        10.34,
        'imgurl'
      ),new ProductModel(
        5,
        'shubham-sharma',
        ' product',
        5000,
        'hue hue'
      )
]