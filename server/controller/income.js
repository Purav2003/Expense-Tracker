const Income = require("../models/incModel")

const addExpense = async (req,res)=>{
    const income = await Income.create(req.body)
    res.send({income,success:true,status:200})
}

const getExpenses = async (req,res)=>{
    const expenses = await Income.find()
    res.send({expenses,count:expenses.length,success:true,status:200})
}

// const deleteExpense = async (req,res)=>{
//     const income = await Income.findByIdAndDelete(req.params.id)
//     if(!income){
//         res.send({msg:"Income not found "})
//     }
//     res.status(200).send({msg:"Income deleted successfully",success:true})
// }

module.exports = {
    addExpense,
    getExpenses,
    // deleteExpense
}