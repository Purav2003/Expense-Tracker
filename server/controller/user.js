require("express-async-errors")
const customAPIError = require("../errors/custom-error")
const User = require("../models/user")

const signup = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(200).send({user,token,success:true})
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

module.exports = {
    signup,
    signin
}