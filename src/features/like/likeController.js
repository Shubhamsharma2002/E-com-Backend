import { Likerepo } from "./likeRepo.js";

export  class LikeController{
    constructor(){
        this.likerepo = new Likerepo();
    }
    async likeitem(req, res, next){
        try {
            const {id, type} = req.body;
            const userID = req.userID;
            if(type != 'Product' && type!='Category'){
                return res.status(400).send('Invalid Type');
            }
            if(type == 'Product'){
                  this.likerepo.likeProduct(userID, id);
            }else{
                   this.likerepo.likeCategory(userID, id);
            }
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(200).send("something went wrong");
        }
    }

    async getlikes(req, res, next){
        try {
              const {id, type} = req.query;
              const likes = await this.likerepo.getlikes(type, id);
              return res.status(200).send(likes);
        } catch (err) {
            console.log(err);
            return res.status(200).send("something went wrong");
        }
    }
}

