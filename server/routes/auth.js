const express = require("express")
const router = express.Router()
const {signin,signup,getAllUser} = require("../controller/user")
const passport = require("passport")
require("../middlewares/passport-setup")

router.route("/").get(getAllUser)
router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/google").get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.route('/google/callback',passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}))

router.route("/google/success").get((req,res)=>res.send("Success"))
router.route("/google/failure").get((req,res)=>res.send("failure"))

module.exports = router