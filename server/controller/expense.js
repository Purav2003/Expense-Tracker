const Expense = require("../models/expenseModel")
const customAPIError = require("../errors/custom-error")

const addExpense = async (req,res)=>{
    const expense = await Expense.create(req.body)
    res.status(200).send({expense,success:true})
}

const getExpenses = async (req,res)=>{
    const expenses = await Expense.find()
    res.status(200).send({expenses,count:expenses.length,success:true})
}

const deleteExpense = async (req,res)=>{
    const expense = await Expense.findByIdAndDelete(req.params.id)
    if(!expense){
        throw new customAPIError(`No expense with id: ${req.params.id}`,404)
    }
    res.status(200).send({msg:"Expense deleted successfully",success:true})
}

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
}