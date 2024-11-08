const mongoose = require("mongoose");

const {Schema,ObjectId} = mongoose;

const UserSchema = new Schema({
    userId:{
        type:String,
        unique:true,
        required:true   
    },
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
},
{timestamps:true}
);

const TaskSchema = new Schema(
    {
        title:{type:String,required:true},
        completed:{type:Boolean,default:false},
        assignee:String,
        priority:{
            type:String,
            enum:["low","medium","high"],
            default:"medium",
        },
        dueDate:Date,
    },
    {timestamps:true}
);

const TodoListSchema = new Schema(
    {
      owner:{type:ObjectId,ref:"User"},
      title:String,
      tasks:[TaskSchema],
      collaborators:[{type:ObjectId,ref:"User"}],  
    },
    {timestamps:true}
);

const userModel = mongoose.model("User",UserSchema);
const taskModel = mongoose.model("Task",TaskSchema);
const todoListModel = mongoose.model("TodoList",TodoListSchema);

module.exports = {
    userModel,
    taskModel,
    todoListModel
}