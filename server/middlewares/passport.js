const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const User = require("../models/user")
require(".")

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())