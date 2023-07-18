const express = require("express")
const router = express.Router()
const {signin,signup,getAllUser} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signup)
router.route("/signin").post(signin)

module.exports = router