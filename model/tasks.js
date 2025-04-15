const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : String, 
    priority : String,
    assignedBy : String,
    assignedTo : String
})

const Tasks = mongoose.model("Tasks", taskSchema)

module.exports = Tasks