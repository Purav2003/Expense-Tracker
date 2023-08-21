const express = require("express")
const router = express.Router()
const {transaction,dateHighlight,dateData} = require("../controller/dashboard")

router.route("/:id").get(transaction)
router.route("/dateHighlight/:id").get(dateHighlight)
router.route("/dateData/:id").get(dateData)

module.exports = router