require('dotenv').config()
const cors = require("cors")
const express = require('express')
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express()
const server = createServer(app);

const io = new Server(server ,{
    cors:{
        origin : process.env.URL
    }
});

const Users = require('./model/users')
const Tasks = require('./model/tasks')
const db = require("./config/db")
const passport = require('passport')
const jwtStrategy = require('./config/passport')

db()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(passport.initialize())
app.use("/", require('./routes'))

const port = process.env.PORT

io.on('connection', (socket) => {
    console.log("a new user connected")
    socket.on("connected", () => {
        socket.broadcast.emit("NewUserConnected", "A new User has Joined")
    })
    socket.on('IhadAnUpdatedTask', (task)=>{
        socket.broadcast.emit('IsThereAnUpdatedTask', {
             ...task
        })
    })
    socket.on('IhadAnUpdatedTaskEdit', (task) => {
        socket.broadcast.emit('IsThereAnUpdatedTaskEdit', {
            ...task
        })
    })


    socket.on('IhadUpdatedTaskStatus', (task) => {
        console.log(task, "i had")
        socket.broadcast.emit('IsthereAnUpdatedTaskStatus', {
            ...task
        })
    })
  });

server.listen(port, () => console.log("server is up", port))