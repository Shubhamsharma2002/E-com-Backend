import ProductModel from "./product-model.js";

import productRepo from "./product-repo.js";
export default class ProductController{

      constructor(){
        this.productRepo = new productRepo();
      }




   async getAllProduct(req, res ){

    try {
        const products = await this.productRepo.getAll();
        res.status(200).send(products);
    } catch (err) {
        console.log(err)
        return res.status(200).send("some thing went wrong");
    }
       
    }
     async addProduct(req, res ){
        try{

        
       const {name, price, size, categories} = req.body;
       const newProduct = new ProductModel(name,null,req?.file?.filename,categories,parseFloat(price),size?.split(','));
    //    const newProduct = {
    //     name,
    //     price:parseFloat(price),categories
    //     sizes:sizes.split(','),
    //     imgUrl:req.file.filename,
    //    };
      
       const createRecord = await this.productRepo.add(newProduct);
       res.status(201).send(createRecord);
    }catch (err){
        console.log(err)
        return res.status(200).send("some thing went wrong");
    }
    }
   async rateProduct(req, res, next) {
        try{
          const userID = req.userID;
          const productID = req.body.productID;
          const rating = req.body.rating;
         await this.productRepo.rate(
            userID,
            productID, 
            rating
            );
            return res
              .status(200)
              .send('Rating has been added');
        } catch(err){
          console.log(err);
          console.log("Passing error to middleware");
          next(err);
        }
      } 
    async getOneProduct(req, res){
       const id = req.params.id;
    //    const product = ProductModel.get(id);

       
    try {
        const product =  await this.productRepo.get(id);
        res.status(200).send(product);
    } catch (err) {
        console.log(err)
        return res.status(200).send("some thing went wrong");
    }
       
       
    }
   async filterProduct(req, res){
      try{

      
        const minprice  = req.query.minPrice;
        const maxprice = req.query.maxPrice;
        const id = req.query.id;
        
        const result =  await this.productRepo.filter(minprice,maxprice,id);
        console.log(result);
        res.status(200).send(result);
      }catch(err){
        console.log(err)
        return res.status(200).send("some thing went wrong");
      }
    }
}