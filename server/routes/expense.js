const express = require("express")
const router = express.Router()
const {addExpense,getSingleExpense,deleteExpense} = require("../controller/expense")

router.route("/").post(addExpense)
router.route("/:id").get(getSingleExpense).delete(deleteExpense)

module.exports = router