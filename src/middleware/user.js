const express = require("express");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");

const token = jwt.sign({},JWT_USER_PASSWORD)

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);
     
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }
}

module.exports = userMiddleware;