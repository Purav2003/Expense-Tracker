const express = require("express")
const router = express.Router()
const {addIncome,getIncome} = require("../controller/income")

router.route("/").post(addIncome)
// router.route("/:id").get(getIncome)
// router.route("/:id").delete(deleteExpense)

module.exports = router