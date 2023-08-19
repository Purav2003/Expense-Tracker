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
    let result;
    let totalItems;
    const filterDate = req.query.daysAgo
    let daysAgo = new Date()
    if(filterDate==="oneweek"){
        daysAgo.setDate(daysAgo.getDate() - 7)
        result = Income.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Income.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else if(filterDate==="onemonth"){
        daysAgo.setMonth(daysAgo.getMonth() - 1)
        result = Income.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Income.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else if(filterDate==="sixmonth"){
        daysAgo.setMonth(daysAgo.getMonth() - 6)
        result = Income.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Income.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } 
    else if(filterDate==="oneyear"){
        daysAgo.setFullYear(daysAgo.getFullYear() - 1)
        result = Income.find({createdBy:id,date:{$gt:daysAgo}})
        totalItems = await Income.find({createdBy:id,date:{$gt:daysAgo}}).countDocuments()
    } else{
        result = Income.find({createdBy:id})
        totalItems = await Income.find({createdBy:id}).countDocuments()
    }
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

const search = async (req,res)=>{
    const id = req.params.id
    const result = await Income.find({
        createdBy:id,
        description:{
            $regex: new RegExp(req.body.search,"i")
        }
    })
    if(!result){
        res.send({result,success:false,status:404})
    } else{
        res.send({result,success:true,status:200})
    }
}

module.exports = {
    addIncome,
    getSingleIncome,
    deleteIncome,
    search
}