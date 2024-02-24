import UserModel from '../features/user/userModel.js';
// import user from '../features/user/userModel'

const basicAuthorizer = (req, res, next) =>{
    //  1. check if authorization header is empty .
    const authHeder = req.headers["authorization"];
    if(!authHeder){
        return res.status(401).send("no authorization detail found")
    }

    // 2. Extract credential .
      const base64Credential = authHeder.replace('Basic', '');
      const decodedCred = Buffer.from(base64Credential, 'base64').toString('utf-8');
      const cred = decodedCred.split(':');
      const user = UserModel.getAll().find(u => u.email == cred[0] && u.password[1]);
      if(user){
        next();
      }else{
        return res.status(401).send('unAutho');
      }
}


export default basicAuthorizer;