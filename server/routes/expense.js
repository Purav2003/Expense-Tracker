const express = require("express")
const router = express.Router()
const {addExpense,getSingleExpense} = require("../controller/expense")

router.route("/").post(addExpense)
router.route("/:id").get(getSingleExpense)

module.exports = router