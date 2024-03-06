import express from'express';
import { LikeController } from './likeController.js';

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/", (req, res, next) =>{
    likeController.likeitem(req, res, next);
})
likeRouter.get("/", (req, res, next) =>{
    likeController.getlikes(req, res, next);
})

export default likeRouter;