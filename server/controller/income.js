const Income = require("../models/incomeModel")

const addIncome = async (req,res)=>{
    try{
        const income = await Income.create(req.body)
        res.send({income,success:true,status:200})
    } catch(err){
        res.send({msg:"Message is too big",success:false,status:400})
    }
}

const getSingleIncome = async (req,res)=>{
    const id = req.params.id
    let result = Income.find({createdBy:id})
    let totalItems = await Income.find({createdBy:id}).countDocuments()
    if(!result){
        res.send({result,count:0,success:true,status:200})
    } else{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page-1)*limit
        const totalPages = Math.ceil(totalItems / limit);
        result = result.skip(skip).limit(limit)
        const income = await result.sort({createdAt:-1})
        res.send({totalItems,totalPages,income,currentPage:page,count:income.length,success:true,status:200})
    }
}

const deleteIncome = async (req,res)=>{
    const id = req.params.id
    const income = await Income.deleteOne({_id:id})
    res.send({msg:"Item deleted successfully",success:true,status:200})
}

module.exports = {
    addIncome,
    getSingleIncome,
    deleteIncome
}