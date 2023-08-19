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
    let result;
    let totalItems;
    const filterDate = req.query.daysAgo
    const search = req.query.search
    let daysAgo = new Date()
    if(filterDate==="oneweek"){
        daysAgo.setDate(daysAgo.getDate() - 7)
        result = Expense.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Expense.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else if(filterDate==="onemonth"){
        daysAgo.setMonth(daysAgo.getMonth() - 1)
        result = Expense.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Expense.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else if(filterDate==="sixmonth"){
        daysAgo.setMonth(daysAgo.getMonth() - 6)
        result = Expense.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Expense.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } 
    else if(filterDate==="oneyear"){
        daysAgo.setFullYear(daysAgo.getFullYear() - 1)
        result = Expense.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Expense.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else{
        result = Expense.find({createdBy:id})
        totalItems = await Expense.find({createdBy:id}).countDocuments()
    }
    if(search){
        result = Expense.find({
            $and: [
                {createdBy: id,},
                {
                    $or: [
                        {description: {$regex: new RegExp(search, "i")}},
                        {mode: {$regex: new RegExp(search, "i")}},
                        {to: {$regex: new RegExp(search, "i")}},
                        {category: {$regex: new RegExp(search, "i")}}
                    ]
                }   
            ]
        })
        const result1 = await Expense.find({
            $and: [
                {createdBy: id,},
                {
                    $or: [
                        {description: {$regex: new RegExp(search, "i")}},
                        {mode: {$regex: new RegExp(search, "i")}},
                        {to: {$regex: new RegExp(search, "i")}},
                        {category: {$regex: new RegExp(search, "i")}}
                    ]
                }   
            ]
        })
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)
        const expenses = await result.sort({ createdAt: -1 })
        totalItems = result1.length
        const totalPages = Math.ceil(totalItems / limit);
        res.send({ totalItems, totalPages, expenses, currentPage: page, count: expenses.length, success: true, status: 200 })
    }
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