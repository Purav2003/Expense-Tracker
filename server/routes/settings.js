const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

const {changeCurrency} = require("../controller/settings")

router.route("/changeCurrency/:id").patch(authMiddleware,changeCurrency)

module.exports = router