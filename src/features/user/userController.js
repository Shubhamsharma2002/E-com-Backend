
import Userrepo from './user-repo.js';
import UserModel from './userModel.js';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export default class UserController {

  constructor(){
    this.uuserRepo = new Userrepo();
  }
 async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    //  used to hashed the password
    const hashPassword = await bcrypt.hash(password, 12)


    const user = new UserModel(
      name,
      email,
      hashPassword,
      type
    );

    await this.uuserRepo.SignUp(user)
    res.status(201).send(user);
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
            userID:  result.id,
            email: result.email,
          },
          'vuCr6JSa0Uq0km4MLReIoPDvNvCNMeTV',
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
