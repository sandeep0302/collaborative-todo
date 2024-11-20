require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");


const {userRouter} = require('./src/routes/user')
const {listRouter} = require('./src/routes/list')

const app = express()
app.use(express.json());
const port = 3000;

app.use('/user',userRouter);
app.use('/list',listRouter);

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
console.log("(Connected to Database)");
})
.catch ((e) =>{
        console.error('Failed to start server:', error);
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});