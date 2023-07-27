const Income = require("../models/incomeModel")

const addIncome = async (req,res)=>{
    const income = await Income.create(req.body)
    res.send({income,success:true,status:200})
}

const getSingleIncome = async (req,res)=>{
    const id = req.params.id
    const expenses = await Income.findById(id)
    res.send({expenses,count:expenses.length,success:true,status:200})
}

module.exports = {
    addIncome,
    getSingleIncome,
}