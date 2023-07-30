const Expense = require("../models/expenseModel")

const addExpense = async (req,res)=>{
    try{
        const expense = await Expense.create(req.body)
        res.send({expense,success:true,status:200})
    } catch(err){
        res.send({msg:"Message is too big",success:false,status:400})
    }
}

const getSingleExpense = async (req,res)=>{
    const id = req.params.id
    let result = Expense.find({createdBy:id})
    let totalItems = await Expense.find({createdBy:id}).countDocuments()
    if(!result){
        res.send({result,count:0,success:true,status:200})
    } else{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page-1)*limit
        const totalPages = Math.ceil(totalItems / limit);
        result = result.skip(skip).limit(limit)
        const expenses = await result.sort({createdAt:-1})
        res.send({totalItems,totalPages,expenses,currentPage:page,count:expenses.length,success:true,status:200})
    }
}

const deleteExpense = async (req,res)=>{
    const id = req.params.id
    const expense = await Expense.deleteOne({_id:id})
    res.send({msg:"Item deleted successfully",success:true,status:200})
}

module.exports = {
    addExpense,
    getSingleExpense,
    deleteExpense
}