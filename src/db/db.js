const mongoose = require("mongoose");

const {Schema,ObjectId} = mongoose;

const baseSchema = new Schema({
  name:String,
  username:String,
  email:String,
  password:String,
  profilePicture:String,
  notification:{type:Boolean,default:true},
});

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
        subtasks:[{title:String,completed:{type:Boolean,default:false}}],
        assignedBy:{type:ObjectId,ref:"users",required:true},
        assignedTo:{type:Object,ref:"users"},
        listId:{type:ObjectId,ref:"todos"}
    });

const TodoSchema = new Schema(
    {
      owner:{type:ObjectId,ref:"User"},
      title:String,
      tasks:[TaskSchema],
      collaborators:[{type:ObjectId,ref:"users"}],  
    });

const User = mongoose.model("users",baseSchema);
const Task = mongoose.model("tasks",TaskSchema);
const Todo = mongoose.model("todos",TodoSchema);

module.exports = {
    User,
    Task,
    Todo
}