require("express-async-errors")
const customAPIError = require("../errors/custom-error")
const User = require("../models/user")
const nodemailer = require("nodemailer")
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});

const signup = async (req,res)=>{
    const userexist = await User.findOne({email:req.body.email})
    if(!userexist){
        const user = await User.create(req.body)
        // const config = {
        //     service:"gmail",
        //     auth:{
        //         user:process.env.EMAIL,
        //         pass:process.env.PASSWORD   
        //     }
        // }

        // const transporter =  nodemailer.createTransport(config)

        // const msg = {
        //     from: process.env.EMAIL, 
        //     to: req.body.email,
        //     subject: "Welcome to Expense Tracker! Your Registration is Complete.",
        //     html: `<b>Congrulations you have successfully registered with Expense Tracker</b><br><p>Dear ${req.body.name}, <br> Congratulations! We are thrilled to inform you that your registration with Expense Tracker has been successfully completed. On behalf of our team, we extend a warm welcome to you as a valued member of our community. <br> Remember, our team is here to support you every step of the way. Should you have any questions or require assistance, please don't hesitate to reach out to us. Our dedicated support team is available via ${process.env.EMAIL}, and we are committed to ensuring you have a seamless experience.<br>Thank you for choosing Expense Tracker as your trusted financial companion. We look forward to helping you gain control over your finances and achieve your financial aspirations. <br><br> <b>Best regards</b></p>`,
        //     }

        // transporter.sendMail(msg).then(() => {
            const token = user.createJWT()
            res.status(200).send({user,token,success:true})
        // }).catch(error => {
        //     return res.status(500).send({ error })
        // })
    } else{
        // console.log("ama jay che?");
        res.status(403).send({msg:"User already exists",success:false})
    }
    
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