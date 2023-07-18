const express = require("express")
const router = express.Router()
const passport = require("passport")
const {signin,signup} = require("../controller/user")

require("../middlewares/passport-setup")

router.route("/").get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.route("/signup").get(signup)
// router.route("/signin").get()
router.route('/callback').get(passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/signup'
}),function(req,res){
    res.redirect("signup")
})


module.exports = router