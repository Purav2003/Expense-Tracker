const express = require("express")
const router = express.Router()
const signupValidation = require("../middlewares/signupValidation")
const {signin,signup,getAllUser} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signupValidation,signup)
router.route("/signin").post(signin)

module.exports = router