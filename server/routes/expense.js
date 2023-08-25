const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()
const {addExpense,getSingleExpense,deleteExpense} = require("../controller/expense")

router.route("/").post(authMiddleware,addExpense)
router.route("/:id").get(authMiddleware,getSingleExpense).delete(authMiddleware,deleteExpense)

module.exports = router