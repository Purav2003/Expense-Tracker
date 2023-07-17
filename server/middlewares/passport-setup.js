const passport = require("passport-google-oauth2");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    passReqToCallback: true,
},function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null,profile)
    }
))