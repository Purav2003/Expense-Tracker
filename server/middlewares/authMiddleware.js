const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.send({msg:"Token not found",success:false,status:495})
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId,name:payload.name}
        const user = await User.findById(payload.userId)
        // if(!user){
        //     res.send({msg:"User not found",success:false,status:495})
        // } else{
            next()
        // }
    } catch(err){
        res.send({msg:"Invalid Token",success:false,status:495})
    }
}

module.exports = authMiddleware