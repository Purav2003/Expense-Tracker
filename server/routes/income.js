const express = require("express")
const router = express.Router()
const {addIncome,getSingleIncome,deleteIncome} = require("../controller/income")

router.route("/").post(addIncome)
router.route("/:id").get(getSingleIncome).delete(deleteIncome)

module.exports = router