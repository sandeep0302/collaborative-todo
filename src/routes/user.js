const {Router} = require("express");
const {userModel,todoModel,todoListModel} = require("../db/db")
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const {userMiddleware} = require("../middleware/user");

const userRouter = Router();


userRouter.post('/create', async function(req,res){
   const {userId,name, email,password} = req.body;

   await userModel.create({
      userId,
      name,
      email,
      password
   })
   res.json({
      message:"User created successfully",
      
   })
})

userRouter.post('/signin',function(req,res){

})

app.listen(3000);
