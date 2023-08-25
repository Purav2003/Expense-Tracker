const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()
const {transaction,dateHighlight,dateData,statistics,search} = require("../controller/dashboard")

router.route("/:id").get(authMiddleware,transaction)
router.route("/dateHighlight/:id").get(authMiddleware,dateHighlight)
router.route("/dateData/:id").post(authMiddleware,dateData)
router.route("/statistics/:id").get(authMiddleware,statistics)
router.route("/search/:id").get(authMiddleware,search)

module.exports = router