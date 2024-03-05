
import Userrepo from './user-mrepo.js';
import UserModel from './userModel.js';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export default class UserController {

  constructor(){
    this.uuserRepo = new Userrepo();
  }
  async resetPassword (req, res,next){
    const {newPassword} = req.body;
    const hashPassword = await bcrypt.hash(newPassword, 12) ;
    const userID = req.userID;
    try {
        await this.uuserRepo.resetPassword(userID,hashPassword);
              res.status(200).send("password is updated");
    } catch (err) {
      console.log(err);
      console.log("Passing error to midleware");
      next(err);
    }
  }


  // async resetPassword(req, res, next){
  //   const {newPassword} = req.body;
  //   const hashedPassword = await bcrypt.hash(newPassword, 12)
  //   const userID = req.userID;
  //   try{
  //     await this.uuserRepo.resetPassword(userID, hashedPassword)
  //     res.status(200).send("Password is updated");
  //   }catch(err){
  //     console.log(err);
  //     console.log("Passing error to middleware");
  //     next(err);
  //   }
  // }
 async signUp(req, res, next) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    //  used to hashed the password
    

try {
  const hashPassword = await bcrypt.hash(password, 12)
  const user = new UserModel(
    name,
    email,
    hashPassword,
    type
  );

  await this.uuserRepo.SignUp(user)
   res.status(201).send(user);
} catch (err) {
    next(err);
}
    
  }

 async signIn(req, res) {

  try {
      
    const user = await this.uuserRepo.findByEmail(req.body.email);
    if(!user){

      return res.status(400).send('incorrect credential');
    }else{
       const result =  await bcrypt.compare(req.body.password, user.password);
       if(result){
        const token = jwt.sign(
          {
            userID:  user._id,
            email: user.email,
          },
          process.env.JWT_TOKEN,
          {
            expiresIn: '1h',
          }
          
  
        );
        return res.status(200).send(token);
       }else{
        return res
        .status(400)
        .send('Incorrect Credentials---');
       }
    }
  
    
    
  }catch(err){
       console.log(err)
       return res.status(200).send("some thing went wrong");
  }
  }

}
