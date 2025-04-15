const Tasks = require('../model/tasks')
const Users = require('../model/users')

const createTask = (req, res) => {
    
    // console.log(req.user)
    console.log(req.body)
    const { title,description,status,priority,assignedBy,assignedTo} = req.body
    Tasks.create({title,description,status,priority,assignedBy,assignedTo}).then(task => {
        if(task){
            return res.status(200).json({task, message : "task created"})
        }
    }).catch(err => {
        console.log(err)
    })
}



const updateTasks = (req, res) => {
    console.log(req.body)
    const {id} = req.params
    const { title,description,status,priority,assignedBy,assignedTo} = req.body
    
    Tasks.findByIdAndUpdate(id,{title,description,status,priority,assignedBy,assignedTo},{new: true}).then(task => {
        if(task){
            return res.status(200).json({task,message : "task updated"})

        }
    }).catch(err => {
        console.log(err)
    })
}

const Alltasks = (req, res) => {
    Tasks.find({}).then(tasks => {
        if (tasks) {
            return res.status(200).json({ tasks })
        }
        return res.status(400).json({ message: "No Tasks Assigned yet !" })
    }).catch(err => {
        console.log(err)
    })
}


const managerTasks = (req, res) => {
    console.log(req.body)
    const {id} = req.params

    Tasks.find({assignedBy:id}).then(tasks => {
        if(tasks){
            return res.status(200).json({tasks})
        }
    }).catch(err => {
        console.log(err)
    })
}

const employees = (req, res) => {
    Users.find({role: "Employee"}).then(users => {
        return res.status(200).json({users})
    }).catch(err => {
        console.log(err)
    })
}

const employeeTasks = (req, res) => {
    const {assignedTo} = req.params
    
    console.log(assignedTo)
    Tasks.find({assignedTo:assignedTo}).then(tasks => {
        console.log(tasks)

        if(tasks){
            
            return res.status(200).json({tasks})
        }
    }).catch(err => {
        console.log(err)
    })
}

const employeeTaskUpdate = (req, res) => {
    console.log(req.body)
    const {id} = req.params
    const {status} = req.body
    Tasks.findByIdAndUpdate(id,{status},{new : true}).then(task => {
        if(task){
            return res.status(200).json({task, message : "task updated"})
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    createTask, updateTasks, Alltasks, employeeTaskUpdate, employees, managerTasks, employeeTasks 
}