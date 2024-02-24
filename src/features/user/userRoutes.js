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

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res)
});
userRouter.post('/signin', (req, res) =>{
    userController.signIn(req, res)
});

export default userRouter;
