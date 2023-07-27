const Income = require("../models/incomeModel")

const addIncome = async (req,res)=>{
    const income = await Income.create(req.body)
    res.send({income,success:true,status:200})
}

const getSingleIncome = async (req,res)=>{
    const id = req.params.id
    const expenses = await Income.find({createdBy:id})
    if(!expenses){
        res.send({expenses,count:0,success:true,status:200})
    } else{
        res.send({expenses,count:expenses.length,success:true,status:200})
    }
}

module.exports = {
    addIncome,
    getSingleIncome,
}