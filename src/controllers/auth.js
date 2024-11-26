const {registrationSchema,loginSchema} = require("../validation/validation");
const {User} = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req,res) => {
    try {
        const parseData = registrationSchema.parse(req.body);
        const {name,username,email,password} = parseData;

        const isRepeatedEmail = await User.findOne({email});
        const isRepeatedUsername = await User.findOne({username});
        if (isRepeatedEmail)
            res.status(403).json({message:"Email already registration"});

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            username,
            name,
            email,
            password:hashedPassword
        });

      const  userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password;
      
      res.status(201).json({
        message:"User created successfully",
        user:userWithoutPassword,
      });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:"Something went Wrong"});
    }
};

const signin = async(req,res) => {
    try{
        const parsedData = loginSchema.parse(req.body);
        const {email,password} = parsedData;
        const registeredUser = await User.findOne({email});

        if(!registeredUser){
            res.status(400).json({message:"User Not Found,Please Sign up first"})
        }

        const hashedPassword = registeredUser.password;
        const isPasswordValid = bcrypt.compare(password,hashedPassword);
        if(!isPasswordValid){
            res.status(400).json({message:"Password is incorrect"})
        }

        let token = await jwt.sign({id:registeredUser._id},JWT_SECRET);
        res.status(200).json({token});
    }catch(error){
      console.log(error.message);
      res.status(400).json({message:"Something went wrong"});
    }
};
module.exports = {
    signup,
    signin

}