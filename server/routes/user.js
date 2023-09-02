const express = require("express")
const router = express.Router()
const signupValidation = require("../middlewares/signupValidation")
const authMiddleware = require("../middlewares/authMiddleware")
const {signin,signup,getAllUser,profile,changePassword,forgetPasswordMailConfirmation,forgetPassword,editProfile,logout,addCategory,uploadImage} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signupValidation,signup)
router.route("/signin").post(signin)
router.route("/profile/:id").get(authMiddleware,profile)
router.route("/profile/editProfile/:id").put(authMiddleware,signupValidation,editProfile)
router.route("/changePassword/:id").post(authMiddleware,changePassword)
router.route("/forgetPasswordMailConfirmation").post(forgetPasswordMailConfirmation)
router.route("/forgetPassword").post(forgetPassword)
router.route("/addCategory/:id").post(authMiddleware,addCategory)
// router.route("/uploadImage/:id").post(authMiddleware,uploadImage)
router.route("/logout").post(authMiddleware,logout)

module.exports = router