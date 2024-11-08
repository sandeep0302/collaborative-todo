const  {z} =  require("zod");

const mySchema = z.string();

const userSchema = z.object({
    userId:z.string().min(1),
    email:z.string().max(20),
    password:z.string().min(7)
});

const todoSchema = z.object({
    title:z.string().min(1,{message:"Title is required"})
})

const taskSchema = z.object({
   title:z.string().min(1,{message:"Title is required"}),
   completed:z.boolean(),
   assignee:z.string(),
   priority:z.string(),
   dueDate:z.Date()
})

const todoListSchema = z.object({
    owner:z.string(),
    tasks:z.string()
})

module.exports = {
    userSchema,
    taskSchema,
    todoSchema
}



