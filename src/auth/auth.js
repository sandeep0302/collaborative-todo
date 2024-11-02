const express = require("express");
const jwt = require('jsonwebtoken');

const token = jwt.sign({},'asdfg')



function auth(req,res,next){
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                res.status(401).send({
                    message:"Unauthorized"
                })
            }else {
                req.user = decoded;
                next();
            }
        })
    }
}

