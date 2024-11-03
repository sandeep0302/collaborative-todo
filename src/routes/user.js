const {Router} = require("express");
const {userModel,todoModel,todoListModel} = require("../models/models")
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const {userMiddleware} = require("../middleware/user");

const userRouter = Router();


userRouter.post('/signup', async function(req,res){
   const {userId,name, email,password} = req.body;

   await userModel.create({
   })
})
userRouter.post('/signin',function(req,res){

})

app.listen(3000);
