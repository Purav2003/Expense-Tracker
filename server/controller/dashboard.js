const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")

const transaction = async (req,res)=>{
    const id = req.params.id
    const incomes = await Income.find({createdBy:id})
    const expenses = await Expense.find({createdBy:id}).select("-category")
    const mixedData = [...incomes,...expenses]
    mixedData.sort((a,b)=>a.date-b.date)
    res.send({transaction:mixedData.slice(0,5),success:true,status:200})
}

const dateHighlight = async (req,res)=>{
    const id = req.params.id
    const incomes = await Income.find({createdBy:id}).select("date -_id")
    const expenses = await Expense.find({createdBy:id}).select("date -_id")
    const mixedData = [...incomes,...expenses]
    mixedData.sort((a,b)=>a.date-b.date)
    res.send({dates:mixedData,success:true,status:200})
}

const dateData = async (req,res)=>{
    const id = req.params.id
    const date = new Date(req.body.date)
    console.log(date);
    const incomes = await Income.find({createdBy:id,date:date})
    const expenses = await Expense.find({createdBy:id,date:date})
    res.send({incomes,expenses,success:true,status:200})
}

module.exports = {
    transaction,
    dateHighlight,
    dateData
}