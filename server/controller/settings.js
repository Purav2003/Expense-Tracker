const User = require("../models/user")

const changeCurrency = async(req,res)=>{
    const id = req.params.id
    const {newCurrency} = req.body
    const user = await User.findByIdAndUpdate(id,{currency:newCurrency.toUpperCase()},{new:true})
    res.send({user,msg:"Currency Updated Successfully",success:true,status:200})
}

module.exports = {
    changeCurrency
}