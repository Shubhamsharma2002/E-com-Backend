import './env.js';
import expres from 'express';
import  Swagger  from 'swagger-ui-express';
import  bodyparser from 'body-parser';
// this file is used in hashing of password

import  ProductRouter from './src/features/product/product-routes.js';
import cartRouter from './src/features/cart/cartRoutes.js';
import UserRouter from './src/features/user/userRoutes.js';
import jwtAuth from './src/middleware/jwtMidleware.js';

import apiDocs from './swagger.json' assert{type:'json'};
import loggerMiddleware from './src/middleware/logger-middleware.js';
import { ApplicationError } from './src/errorhandler/application-error-handler.js';
import {connectToMongodb} from './src/config/mongodb.js';
import { moongooseconnection } from './src/config/mongose.js';
import mongoose from 'mongoose';
const server = expres();


server.use(bodyparser.json());
server.use('/api-docs', Swagger.serve, Swagger.setup(apiDocs))
server.use(loggerMiddleware);
server.get('/', (req, res) =>{
    res.send('fired the express sucessfully-:)');
});

server.use('/api/products',jwtAuth, ProductRouter)
server.use('/api/cartItems',jwtAuth, cartRouter)
server.use('/api/users', UserRouter)
// error handler midlware alway use this midle ware at the last
server.use((err, req, res,next) =>{
    console.log(err);
if(err instanceof mongoose.Error.ValidationError){
   return  res.status(400).send(err.message);
}
    if(err instanceof ApplicationError){
       return res.status(err.code).send(err.message);
    }
    res.status(500).send('Something went wrong pls try later');
})
server.use((req, res) =>{
    res.status(404).send("Api is Not Found");
})
server.listen(3000, (req, res) =>{
    console.log("happly fired the server on port  no 3000 -:)");
    // connectToMongodb();
    moongooseconnection();
})
