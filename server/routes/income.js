const express = require("express")
const router = express.Router()
const {addIncome,getSingleIncome,deleteIncome,search} = require("../controller/income")

router.route("/").post(addIncome)
router.route("/:id").get(getSingleIncome).delete(deleteIncome)
router.route("/search/:id").get(search)

module.exports = router