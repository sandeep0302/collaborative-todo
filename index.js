const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose");

const {userRouter} = require('./src/routes/user')
const app = express()
app.use(express.json());

app.use('/v1/user',userRouter)

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening to port");  
}


main();