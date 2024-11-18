const express = require("express");
const { Router } = require("express");
const { userModel, todoModel, todoListModel } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../../config.js");
const { userMiddleware } = require("../middleware/auth");

const listRouter = express.Router();
const app = express();

listRouter.post('/create', async function (req, res) {
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
        res.status(403).json({
            message:"User not found"
           })

    }
})

listRouter.post('/:listId/task',async function(req,res){
    try {
        const {title,assignee,priority,dueDate} = req.body;
        await todoModel.create({
            title: "Clean the house",
            assignee: "user2",
            priority: "high",
            dueDate: "2024-10-31T12:00:00Z"
        })
    res.json({
        message: "Task added successfully",
        task: {
          id: "task1",
          title: "Clean the house",
          completed: false,
          assignee: "user2",
          priority: "high",
          dueDate: "2024-10-31T12:00:00Z",
          subtasks: []
        }
    })
    } catch (error) {
        res.status(403).json({
         message:"Invalid data or list not found"   
        })
    }
})

listRouter.put('/:listId/task/:taskId',async function (req,res){
    try {
        const {task} = req.body;

        await todoListModel.findByIdAndUpdate({
            completed:"true",
        })
        res.json({
             message:"task successfully completed",
             task:{
                id:"task1",
                title:"Clean the house",
                completed:true,
                assignee:"user2",
                priority:"high",
                dueDate:"2024-11-30T12:00:00Z",
                subtasks:[]
             }
        })
    } catch (error) {
        res.status(401).json({
            message:"Task not found or list not found"
        })
        
    }
})


listRouter.delete('/:listId/task/:taskId', function(req,res){
    try {
        res.json({
            message:"Task deleted successfully"
        })

    } catch (error) {
        res.status(401).json({
            message:"Task deleted successfully"
        })
    }
})
module.exports = {
    userRouter : userRouter
} 