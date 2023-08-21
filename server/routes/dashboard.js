const express = require("express")
const router = express.Router()
const {transaction,dateHighlight} = require("../controller/dashboard")

router.route("/:id").get(transaction)
router.route("/dateHighlight/:id").get(dateHighlight)

module.exports = router