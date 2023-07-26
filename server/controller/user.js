require("express-async-errors")
const customAPIError = require("../errors/custom-error")
const User = require("../models/user")
const nodemailer = require("nodemailer")

const signup = async (req,res)=>{
    const user = await User.create(req.body)
    res.status(200).send({user,success:true,status:200})
    
}

const signin = async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        throw new customAPIError("User not found",404)
    }
    const passwordCorrect = user.comparePassword(password)
    if(!passwordCorrect){
        throw new customAPIError("Incorrect Password",401)
    }
    const token =  user.createJWT()
    res.status(200).send({user,token,success:true}) 
}

const getAllUser = async(req,res)=>{
    const users = await User.find()
    res.status(200).send({users,count:users.length,success:true})
}

module.exports = {
    signup,
    signin,
    getAllUser
}