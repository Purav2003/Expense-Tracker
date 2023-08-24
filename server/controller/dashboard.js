const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")

const transaction = async (req, res) => {
    const id = req.params.id
    const incomes = await Income.find({ createdBy: id })
    const expenses = await Expense.find({ createdBy: id }).select("-category")
    const mixedData = [...incomes, ...expenses]
    mixedData.sort((a, b) => b.date - a.date)
    res.send({ transaction: mixedData.slice(0,5), success: true, status: 200 })
}

const dateHighlight = async (req, res) => {
    const id = req.params.id
    const incomes = await Income.find({ createdBy: id }).select("date -_id")
    const expenses = await Expense.find({ createdBy: id }).select("date -_id")
    const mixedData = [...incomes, ...expenses]
    mixedData.sort((a, b) => a.date - b.date)
    res.send({ dates: mixedData, success: true, status: 200 })
}

const dateData = async (req, res) => {
    const id = req.params.id
    const date = new Date(req.body.date)
    const incomes = await Income.find({ createdBy: id, date: date })
    const expenses = await Expense.find({ createdBy: id, date: date })
    const mixedData = [...incomes, ...expenses]
    mixedData.sort((a, b) => a.date - b.date)
    res.send({ dateData: mixedData, success: true, status: 200, date: req.body.date })
}

const statistics = async (req, res) => {
    const id = req.params.id
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()
    const totalIncome = await Income.aggregate([
        {
            $match: {
                createdBy: id
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: {
                    $sum: '$amount'
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1
            }
        }
    ])
    const totalExpense = await Expense.aggregate([
        {
            $match: {
                createdBy: id
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: {
                    $sum: '$amount'
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1
            }
        }
    ])
    const totalMonthlyIncome = await Income.aggregate([
        {
            $match: {
                createdBy: id,
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, currentYear] },
                        { $eq: [{ $month: '$date' }, currentMonth] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: {
                    $sum: '$amount'
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1
            }
        }
    ])
    const totalMonthlyExpense = await Expense.aggregate([
        {
            $match: {
                createdBy: id,
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, currentYear] },
                        { $eq: [{ $month: '$date' }, currentMonth] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: {
                    $sum: '$amount'
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1
            }
        }
    ])
    const incomes = await Income.find({ createdBy: id })
    const expenses = await Expense.find({ createdBy: id })
    const totalTransactions = [...incomes, ...expenses].length
    res.send({ totalIncome: totalIncome[0].totalAmount, totalExpense: totalExpense[0].totalAmount, totalMonthlyIncome: totalMonthlyIncome[0].totalAmount, totalMonthlyExpense: totalMonthlyExpense[0].totalAmount, totalTransactions })
}

const search = async (req, res) => {
    const id = req.params.id
    const search = req.query.search
    const incomeItems = await Income.find({
        $and: [
            { createdBy: id, },
            {
                $or: [
                    { description: { $regex: new RegExp(search, "i") } },
                    { mode: { $regex: new RegExp(search, "i") } },
                    { from: { $regex: new RegExp(search, "i") } },
                ]
            }
        ]
    })
    const expenseItems = await Expense.find({
        $and: [
            { createdBy: id, },
            {
                $or: [
                    { description: { $regex: new RegExp(search, "i") } },
                    { mode: { $regex: new RegExp(search, "i") } },
                    { to: { $regex: new RegExp(search, "i") } },
                    { category: { $regex: new RegExp(search, "i") } }
                ]
            }
        ]
    })
    const mixedData = [...incomeItems, ...expenseItems]
    mixedData.sort((a, b) => a.date - b.date)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const searchedData = {}
    if (startIndex > 0) {
        searchedData.previous = {
            page: page - 1,
            limit: limit
        };
    }
    if (endIndex < mixedData.length) {
        searchedData.next = {
            page: page + 1,
            limit: limit
        };
    }
    searchedData.results = mixedData.slice(startIndex, endIndex);
    const totalItems = mixedData.length
    const totalPages = Math.ceil(totalItems / limit)
    res.send({ totalItems, totalPages, currentPage: page, searchedData, success: true, status: 200 })
}

module.exports = {
    transaction,
    dateHighlight,
    dateData,
    statistics,
    search
}