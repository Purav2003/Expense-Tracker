const express = require("express")
const router = express.Router()
const {addIncome,getSingleIncome} = require("../controller/income")

router.route("/").post(addIncome)
router.route("/:id").get(getSingleIncome)
// router.route("/:id").delete(deleteExpense)

module.exports = router