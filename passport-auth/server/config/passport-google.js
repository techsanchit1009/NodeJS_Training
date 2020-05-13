const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

const User = require("../model/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        // options for strategy
        clientID: keys.GOOGLE.CLIENT_ID,
        clientSecret: keys.GOOGLE.CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email, provider: 'google' })
        .then(user => {
          if(!user){
            new User({
              name: profile._json.name,
              email: profile._json.email,
              provider: profile.provider
            }).save()
              .then(newUser => {
                console.log('new user created', newUser);
              });
          }
        });
        return done(null, profile);
      }
    )
  );
};
