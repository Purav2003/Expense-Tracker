const express = require("express")
const router = express.Router()
const {transaction,dateHighlight,dateData,statistics} = require("../controller/dashboard")

router.route("/:id").get(transaction)
router.route("/dateHighlight/:id").get(dateHighlight)
router.route("/dateData/:id").post(dateData)
router.route("/statistics/:id").get(statistics)

module.exports = router