const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        minLength: [14,"The min length should be 14 letters with space"],
        maxLength:30,
        trim: true,
        required:true
    },
    completed: {
        type: Boolean,
        defauly: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task
