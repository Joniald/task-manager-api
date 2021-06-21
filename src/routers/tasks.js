const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

// The Tasks document CRUD
// // Post tasks
// router.post("/tasks", async (req,res)=>{
//     const newTask = new Task(req.body);
//     try {
//         const taskSave = await newTask.save()
//         res.status(201).send(taskSave)
//     } catch (e) {
//         res.status(400).send(e)
//     }
//     // newTask.save().then((result)=>{
//     //     res.status(201).send(result)
//     // }).catch((error)=>{
//     //     res.status(400).send(error.errors)
//     // })
// })
// Post tasks assosiated with the auth user
router.post("/tasks", auth, async (req,res)=>{
    const newTask = new Task({
        ...req.body,
        owner:req.user._id
    });
    try {
        const taskSave = await newTask.save()
        res.status(201).send(taskSave)
    } catch (e) {
        res.status(400).send(e)
    }
})
// Get all tasks
router.get("/tasks", auth, async (req,res)=>{
   // Filtering the comleted tasks
   const match = {}
   if (req.query.completed) {
       match.completed = req.query.completed === "true"
   }
   // Sorting  GET /tasks?sortBy=createdAt:desc  or asc
   // the comand is sort: {createdAt:1 or -1} 
   // where asc => 1   desc => -1
   const sort = {}
   if (req.query.sortBy) {
       const parts = req.query.sortBy.split(":")
       sort[parts[0]] = parts[1] === "desc" ? -1 : 1
   }

    try {
      // const taskFind = await Task.find({})
      //    const taskFind = await Task.find({
      //        owner:req.user._id
      //     })
      //    res.send(taskFind)
      
      // the same as the previous one
        await req.user.populate({
          path:"tasks",
          // Filtering the comleted tasks  GET /tasks?completed=true or false
          match: match,
          // Pagination limit and skip  GET /tasks?limit=nr&skip=nr
          options: {
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              // Sorting  GET /tasks?sortBy=createdAt:desc  or asc
              sort: sort
          }
        }).execPopulate()
        res.send(req.user.tasks)
      
    } catch (e) {
      res.status(500).send(e)
    }
    // Task.find({}).then((result)=>{
    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})
// Get task with id
router.get("/tasks/:id", auth, async (req,res)=>{
    const _id = req.params.id;
    try {
     //const taskFindId = await Task.findById(_id)
     const taskFindId = await Task.findOne({_id, owner:req.user._id})
     if (!taskFindId) {
         return res.status(404).send(taskFindId)
     }
     res.send(taskFindId)
    } catch (e) {
        res.status(500).send(e)
    }
     
    // Task.findById(_id).then((result)=>{
    //     if(!result){
    //         return res.status(404).send(result)
    //     }
    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

router.patch("/tasks/:id", auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const validUpdate = ["description", "completed"]
    const isValidUpdate = updates.every((update)=>{
        return validUpdate.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send({error:"Invalid updates!"})
    }

    try{
      //const task = await Task.findById(req.params.id);
      const task = await Task.findOne({_id:req.params.id, owner:req.user._id})

      if (!task) {
        return res.status(404).send({error:"Task not found"})
      }

      updates.forEach((update)=>task[update]=req.body[update])
      await task.save()

      //const taskUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new:true})
      
      res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a task
router.delete("/tasks/:id", auth, async (req,res)=>{
    try{
      //const task = await Task.findByIdAndDelete(req.params.id)
      const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
      if(!task) {
          return res.status(404).send()
      }
      
      res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router