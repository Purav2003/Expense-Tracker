const express = require("express")
const router = express.Router()
const signupValidation = require("../middlewares/signupValidation")
const {signin,signup,getAllUser,profile} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signupValidation,signup)
router.route("/signin").post(signin)
router.route("/profile/:id").get(profile)

module.exports = router