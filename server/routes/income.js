const express = require("express")
const router = express.Router()
const {addIncome,getIncome} = require("../controller/income")

router.route("/").post(addIncome).get(getIncome)
// router.route("/:id").delete(deleteExpense)

module.exports = router