require("dotenv").config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, done) {
            const user = await User.findOne({googleId: profile.id})
            if(!user){
                const name = profile.displayName
                const email = profile.emails[0].value
                const googleId = profile.id
                const newUser = await User.create({name,email,googleId})
            } else{
                console.log("User already exist");
            }
            done(null,profile)
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})