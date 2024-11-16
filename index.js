require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");


const {userRouter} = require('./src/routes/user')
const app = express()
app.use(express.json());

app.use('/v1/user',userRouter);
app.use('/v1/list',userRouter);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const PORT = process.env.PORT;
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
main();

app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});