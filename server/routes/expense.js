const express = require("express")
const router = express.Router()
const {addExpense,getExpenses,deleteExpense} = require("../controller/expense")

router.route("/").post(addExpense).get(getExpenses)
router.route("/:id").delete(deleteExpense)

module.exports = router