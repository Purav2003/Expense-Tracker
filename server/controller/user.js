require("express-async-errors")
const customAPIError = require("../errors/custom-error")
const User = require("../models/user")
const nodemailer = require("nodemailer")
const mailgen = require("mailgen")

const signup = async (req,res)=>{
    const user = await User.create(req.body)
    const config = {
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD   
        }
    }

    const transporter =  nodemailer.createTransport(config)

    const MailGenerator = new mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    const response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            outro: "Looking forward to do more business"
        }
    }

    const mail = MailGenerator.generate(response)

    
    let message = {
        from : process.env.EMAIL,
        to : req.body.email,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        const token = user.createJWT()
        res.status(200).send({user,token,success:true})
    }).catch(error => {
        return res.status(500).json({ error })
    })
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