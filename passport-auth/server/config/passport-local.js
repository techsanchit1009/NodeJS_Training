const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../model/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        // Match User
        let user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Email ID does not exist" });
        }

        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect!" });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

};
