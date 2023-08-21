require("express-async-errors")
const User = require("../models/user")
const sendEmail = require("./emailctrl")

const signup = async (req, res) => {
    const { numberError, passwordError, emailError } = req.user
    if (numberError && passwordError && emailError) {
        const userexist = await User.findOne({ email: req.body.email })
        if (!userexist) {
            const phoneexist = await User.findOne({ mobile: req.body.mobile })
            if (!phoneexist) {
                const user = await User.create(req.body)
                const token = user.createJWT()
                const data = {
                    to:req.body.email,
                    text:`Hey ${req.body.name}`,
                    subject:"Welcome to Expense Tracker",
                    html:"<h3>Congrulations you have successfully registered to Expense Tracker</h3>"
                }
                sendEmail(data)
                res.send({ user, token, success: true, status: 200 })
            } else {
                res.send({ msg: "Phone Number already exists", success: false, status: 403 })
            }
        } else {
            res.send({ msg: "User already exists", success: false, status: 403 })
        }
    } else {
        if (!numberError) {
            res.send({ msg: "Enter Valid Number", success: false, status: 403 })
        } else if (!emailError) {
            res.send({ msg: "Enter Valid Email", success: false, status: 403 })
        }
        else if (!passwordError) {
            res.send({ msg: "Enter Valid Password", success: false, status: 403 })
        }
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        res.send({ msg: "User not found", success: false, status: 404 })
    } else {
        const passwordCorrect = await user.comparePassword(password)
        if (!passwordCorrect) {
            res.send({ msg: "Incorrect Password", success: false, status: 401 })
        } else {
            const token = user.createJWT()
            res.send({ user, token, success: true, status: 200 })
        }
    }
}

const getAllUser = async (req, res) => {
    const users = await User.find()
    res.send({ users, count: users.length, success: true })
}

const profile  = async (req,res)=>{
    const user = await User.findById(req.params.id)
    res.send({user,success:true,status:200})
}

const changePassword = async (req,res)=>{
    const id = req.params.id
    const {oldPassword,newPassword} = req.body
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(newPassword)
    const user = await User.findById(id)
    if(await user.comparePassword(oldPassword)){
        if(!passwordValidation){
            res.send({msg:"Entered Password is not strong",success:false,status:403})
        } else{
            user.password = newPassword
            await user.save()
            res.send({msg:"Password Changed Successfully",success:true,status:200})
        }   
    } else{
        res.send({msg:"Old Password is Incorrect",success:false,status:401})
    }
}

const forgetPasswordMailConfirmation = async(req,res)=>{
    const email = req.body
    const user = await User.findOne({email:email})
    if(!user){
        res.send({msg:"User does not exist",success:false,status:404})
    } else{
        const data = {
            to:email,
            text:`Hey ${user.name}`,
            subject:"Forget Password",
            html:`<h3>You chan change your password by clicking on the given link<a href="http://localhost:5173/forget-password">Click Here</a></h3>`
        }
        sendEmail(data)
        res.send({email:email,msg:"Check your mail",success:true,status:200})
    }
}

const forgetPassword = async(req,res)=>{
    const {email,newPassword} = req.body
    const user = await User.findOne({email:email})
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(newPassword)
    if(!passwordValidation){
        res.send({msg:"Entered Password is not strong",success:false,status:403})
    } else{
        user.password = newPassword
        await user.save()
        res.send({msg:"Password Changed Successfully",success:true,status:200})
    }  
}

module.exports = {
    signup,
    signin,
    getAllUser,
    profile,
    changePassword,
    forgetPasswordMailConfirmation,
    forgetPassword
}