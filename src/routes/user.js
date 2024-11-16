const express = require("express")
const {Router} = require("express");
const {userModel,todoModel,todoListModel} = require("../db/db")
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../../config.js");
const {userMiddleware} = require("../middleware/auth");

const userRouter = express.Router();
const app = express();


userRouter.post('/create', async function(req,res){
    try{
   const {userId,name, email,password} = req.body;
   await userModel.create({
      userId,
      name,
      email,
      password
   })
   res.json({
      message:"User created successfully",
      user:{
         userId,
         name,
         email,
         profilePicture,
         bio,
         notifications
      }
   })
}
catch (error) {
   res.status.json({
    message:"User ID or email already exists"
   })
}

})


userRouter.post('/signin', async function(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }

        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_PASSWORD);

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = {
    userRouter
}

