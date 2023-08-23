const express = require("express")
const router = express.Router()
const {transaction,dateHighlight,dateData,statistics,search} = require("../controller/dashboard")

router.route("/:id").get(transaction)
router.route("/dateHighlight/:id").get(dateHighlight)
router.route("/dateData/:id").post(dateData)
router.route("/statistics/:id").get(statistics)
router.route("/search/:id").get(search)

module.exports = router