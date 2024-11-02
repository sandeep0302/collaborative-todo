const {Router} = require("express");
const {userModel,todoModel,todoListModel} = require("../models/models")
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const {userMiddleware} = require("../middleware/user");

const userRouter = Router();


userRouter.post('/signup',function(req,res){

})
userRouter.post('/signin',function(req,res){

})

app.listen(3000);
