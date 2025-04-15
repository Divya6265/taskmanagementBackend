const Users = require('../model/users')
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password, role } = req.body

        const isalreadyExist = await Users.findOne({ email: email })

        if (!isalreadyExist) {
            return res.status(400).json({ message: "User not exists!" })
        }
        if(isalreadyExist.password !== password){
            return res.status(400).json({ message: "User password wrong!" })
        }
        const token = jwt.sign({
            email: isalreadyExist.email,
            role: isalreadyExist.role,
            id: isalreadyExist.id
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).json({ result: isalreadyExist, token })

    }catch(err) {
        console.log(err)
    }
}
const signup = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password, role } = req.body

        const isalreadyExist = await Users.findOne({ email: email })

        if (!isalreadyExist) {
            const user = await Users.create({email, password, role})
            return res.status(200).json({ result: user, message: "User created" })
        }
        return res.status(400).json({ message : "User already Exists !" })
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    signup, login
}
