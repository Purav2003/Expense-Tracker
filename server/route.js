const express = require("express")
const router = express.Router()
const test = require("./controller")

router.route("/").post(test)

module.exports = router