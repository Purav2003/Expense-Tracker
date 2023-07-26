require("express-async-errors")
const User = require("../models/user")

const signup = async (req, res) => {
    const userexist = await User.findOne({ email: req.body.email })
    if (!userexist) {
        const phoneexist = await User.findOne({ mobile: req.body.mobile })
        if (!phoneexist) {
            const user = await User.create(req.body)
                    const token = user.createJWT()
                    res.send({ user, token, success: true, status: 200 })
        } else {
            res.send({ msg: "Phone Number already exists", success: false, status: 403 })
        }
    } else {
        res.send({ msg: "User already exists", success: false, status: 403 })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    console.log(user);
    if (!user) {
        console.log("user not found");
        res.send({msg:"User not found",success:false,status:404})
    } else{
        console.log("PASSWORD not found");
        const passwordCorrect = await user.comparePassword(password)
        if (!passwordCorrect) {
            res.send({msg:"Incorrect Password",success:false,status:401})
        } else{
            const token = user.createJWT()
            res.send({ user, token, success: true,status:200 })       
        }
    }
}

const getAllUser = async (req, res) => {
    const users = await User.find()
    res.send({ users, count: users.length, success: true })
}

module.exports = {
    signup,
    signin,
    getAllUser
}