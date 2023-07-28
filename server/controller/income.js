const Income = require("../models/incomeModel")

const addIncome = async (req,res)=>{
    const income = await Income.create(req.body)
    res.send({income,success:true,status:200})
}

const getSingleIncome = async (req,res)=>{
    const id = req.params.id
    let result = Income.find({createdBy:id})
    if(!result){
        res.send({result,count:0,success:true,status:200})
    } else{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page-1)*limit
        const totalItems = await result.countDocuments()
        const totalPages = Math.ceil(totalItems / limit);
        result = result.skip(skip).limit(limit)
        const expenses = await result
        res.send({totalItems,totalPages,expenses,currentPage:page,count:expenses.length,success:true,status:200})
    }
}

module.exports = {
    addIncome,
    getSingleIncome,
}