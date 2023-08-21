const express = require("express")
const router = express.Router()
const {transaction} = require("../controller/dashboard")

router.route("/:id").get(transaction)

module.exports = router