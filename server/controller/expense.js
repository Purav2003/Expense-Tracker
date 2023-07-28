const Expense = require("../models/expenseModel")

const addExpense = async (req,res)=>{
    const expense = await Expense.create(req.body)
    res.send({expense,success:true,status:200})
}

const getSingleExpense = async (req,res)=>{
    const id = req.params.id
    let result = Expense.find({createdBy:id})
    if(!result){
        res.send({result,count:0,success:true,status:200})
    } else{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page-1)*limit
        result = result.skip(skip).limit(limit)
        const expenses = await result
        res.send({expenses,count:expenses.length,success:true,status:200})
    }
}

module.exports = {
    addExpense,
    getSingleExpense,
}