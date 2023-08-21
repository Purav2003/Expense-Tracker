const express = require("express")
const router = express.Router()
const signupValidation = require("../middlewares/signupValidation")
const {signin,signup,getAllUser,profile,changePassword,forgetPasswordMailConfirmation,forgetPassword} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signupValidation,signup)
router.route("/signin").post(signin)
router.route("/profile/:id").get(profile)
router.route("/changePassword/:id").post(changePassword)
router.route("/forgetPasswordMailConfirmation").post(forgetPasswordMailConfirmation)
router.route("/forgetPassword").post(forgetPassword)

module.exports = router