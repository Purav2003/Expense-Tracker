const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const {addIncome,getSingleIncome,deleteIncome} = require("../controller/income")

router.route("/").post(authMiddleware,addIncome)
router.route("/:id").get(authMiddleware,getSingleIncome).delete(authMiddleware,deleteIncome)

module.exports = router