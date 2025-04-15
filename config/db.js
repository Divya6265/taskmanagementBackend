const mongoose = require("mongoose")

// const db = mongoose.Connection

// db.on('error', console.log("error to connect"))

// db.once("open", console.log("db connected"))

// module.exports = db

const dbconnection = async () => {
    try{
        mongoose.connect(process.env.MOGO_URL)
        console.log("db connected")
    }catch(err) {
        console.log("error to connect ", err)
    }
}

module.exports = dbconnection