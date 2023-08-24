const express = require("express")
const router = express.Router()
const {changeCurrency} = require("../controller/settings")

router.route("/changeCurrency/:id").patch(changeCurrency)

module.exports = router