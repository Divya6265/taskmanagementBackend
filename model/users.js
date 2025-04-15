const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    email : String,
    password : String,
    role : String
})
// console.log(usersSchema)
const Users = mongoose.model("Users", usersSchema)

module.exports = Users