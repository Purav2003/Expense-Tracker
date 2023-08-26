const User = require("../models/user")
const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")

const changeCurrency = async (req, res) => {
    const id = req.params.id
    const userOldCurrency = await User.findById(id)
    const oldCurrency = userOldCurrency.currency
    const { newCurrency } = req.body
    const user = await User.findByIdAndUpdate(id, { currency: newCurrency.toUpperCase() }, { new: true })
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.API_Key_EXCHANGE_RATES);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    const incomeData = await Income.find({ createdBy: id })
    for (let i = 0; i < incomeData.length; i++) {
        const incomeItemAmount = incomeData[i].amount;  
        const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${newCurrency}&from=${oldCurrency}&amount=${incomeItemAmount}`, requestOptions)
        const data = await response.json()
        const amount = data.result.toFixed(2)
        await Income.findByIdAndUpdate(incomeData[i]._id,{amount:amount},{new:true})
    }
    const expenseData = await Expense.find({ createdBy: id })
    for (let i = 0; i < expenseData.length; i++) {
        const expenseItemAmount = expenseData[i].amount;  
        const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${newCurrency}&from=${oldCurrency}&amount=${expenseItemAmount}`, requestOptions)
        const data = await response.json()
        const amount = data.result.toFixed(2)
        await Expense.findByIdAndUpdate(expenseData[i]._id,{amount:amount},{new:true})
    }
    res.send({ user, msg: "Currency Updated Successfully", success: true, status: 200 })
}

module.exports = {
    changeCurrency
}