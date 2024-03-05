// // mangae routes 


// import express from'express';
// import userController from './userController.js'

// const UserRouter = express.Router();
// const UserController = new userController();
// UserRouter.post('/signUp', UserController.signUp)
// UserRouter.post('/signin', UserController.signin)

// export default UserRouter;



// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import UserController from './userController.js';
import jwtAuth from '../../middleware/jwtMidleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next)
});
userRouter.post('/signin', (req, res) =>{
    userController.signIn(req, res)
});

userRouter.put('/resetPassword',jwtAuth ,(req, res,next)=>{
    userController.resetPassword(req, res,next)
});
export default userRouter;
