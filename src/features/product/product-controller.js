import ProductModel from "./product-model.js";


export default class ProductController{
    getAllProduct(req, res ){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }
    addProduct(req, res ){
       const {name, price, sizes} = req.body;
       const newProduct = {
        name,
        price:parseFloat(price),
        sizes:sizes.split(','),
        imgUrl:req.file.filename,
       };
      
       const createRecord =  ProductModel.add(newProduct);
       res.status(201).send(createRecord);
    }
    rateProduct(req, res ){
        console.log(req.query)
        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.query.rating;
        try{
            ProductModel.rateProduct(userID,productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }    
        return res.status(200).send("rating has been added");
        


    }
    getOneProduct(req, res){
       const id = req.params.id;
    //    const product = ProductModel.get(id);

       try {
        ProductModel.get(id);
        
       } catch (err) {
        res.status(400).send("product not found", err);
       }
        return res.status(200).send(product);
       
    }
    filterProduct(req, res){
        const minprice  = req.query.minprice;
        const maxprice = req.query.maxprice;
        const id = req.query.id;
        
        const result = ProductModel.filter(minprice,maxprice,id);
        console.log(result);
        res.status(200).send(result);
    }
}