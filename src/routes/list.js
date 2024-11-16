const express = require("express");
const { Router } = require("express");
const { userModel, todoModel, todoListModel } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../../config.js");
const { userMiddleware } = require("../middleware/auth");

const userRouter = express.Router();
const app = express();

userRouter.post('/create', async function (req, res) {
    try {
        const { userId, title } = req.body;
        await todoModel.create({
            userId,
            title
        })
        res.json({
            message: "Task Created Successfully",
            list: {
                id: "list1",
                owner: "user1",
                title: "Weekend Tasks",
                tasks: [],
                collaborators: []
            }
        })
    } catch (error){
        res.status.json({
            message:"User not found"
           })

    }
})

userRouter.post('/:listId/task',async function(req,res){
    try {
        const {title,assignee,priority,dueDate} = req.body;
        await todoModel.create({
            title: "Clean the house",
            assignee: "user2",
            priority: "high",
            dueDate: "2024-10-31T12:00:00Z"
        })
    } catch (error) {
        
    }
})