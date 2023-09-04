const express = require("express")
const router = express.Router()
const passport = require("passport")
const signupValidation = require("../middlewares/signupValidation")
const authMiddleware = require("../middlewares/authMiddleware")
const {signin,signup,getAllUser,profile,changePassword,forgetPasswordMailConfirmation,forgetPassword,editProfile,logout,addCategory,deleteAccount,contactUs,googleLogin,googleLoginCallback} = require("../controller/user")

router.route("/").get(getAllUser)
router.route("/signup").post(signupValidation,signup)
router.route("/signin").post(signin)
// router.route("/google").get(googleLogin)
// router.route("/google/callback").get(googleLoginCallback)
router.get('/google',passport.authenticate('google', {scope: ['profile', 'email'],}));
router.get('/google/callback',passport.authenticate('google', {successRedirect: 'http://localhost:5000/api/v1/auth/success',failureRedirect: 'http://localhost:5000/api/v1/auth/fail',}));
router.get("/success",(req,res)=>{
    res.send("success")
})
router.get("/fail",(req,res)=>{
    res.send("fail")
})
router.route("/profile/:id").get(authMiddleware,profile)
router.route("/profile/editProfile/:id").put(authMiddleware,signupValidation,editProfile)
router.route("/changePassword/:id").post(authMiddleware,changePassword)
router.route("/forgetPasswordMailConfirmation").post(forgetPasswordMailConfirmation)
router.route("/forgetPassword").post(forgetPassword)
router.route("/addCategory/:id").post(authMiddleware,addCategory)
// router.route("/uploadImage/:id").post(authMiddleware,uploadImage)
router.route("/contactus/:id").post(authMiddleware,contactUs)
router.route("/deleteAccount/:id").delete(authMiddleware,deleteAccount)
router.route("/logout").post(authMiddleware,logout)

module.exports = router