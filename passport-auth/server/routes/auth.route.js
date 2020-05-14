const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const url = require('url');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateInput = require("../validation");
const User = require("../model/User");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (excp, user, errMsg) => {
    if (excp) {
      res.sendStatus(400);
    } else if (!user) {
      res.send({ error: errMsg, status: false });
    } else {
      const tokenPayload = {
        name: user.name,
        email: user.email,
        password: user.password
      };
      const token = jwt.sign(tokenPayload, keys.JWT.TOKEN_SECRET, {expiresIn: '60m'} );
      res.send({ status: true, name: user.name, token: token });
    }
  })(req, res, next);
});

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    const tokenPayload = {
      userName: res.req.user.displayName
    }
    const token = jwt.sign(tokenPayload, keys.JWT.TOKEN_SECRET, {expiresIn: '60m'} );
    const tokenData = {
      token: token,
      name: tokenPayload.userName
    }
    res.redirect(url.format({
      pathname: 'http://localhost:3000/',
      query: tokenData
    }));
  }
);

router.post("/signup", (req, res) => {
  const { name, age, email, password } = req.body;
  let errors = validateInput(name, age, email, password);

  if (errors.length > 0) {
    res.send({ errors: errors, status: false });
  } else {
    // Validation Successful
    User.findOne({ email: email, provider: "local" }).then((user) => {
      if (user) {
        errors.push({ message: "User already exists!" });
        return res.send({ errors: errors, status: false });
      } else {
        const newUser = new User({
          name: name,
          age: age,
          email: email,
          password: password,
          provider: "local",
        }); // Only creating an instance and not saving yet.

        // Hashing the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set hashed password
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                const tokenPayload = {
                  name: user.name,
                  email: user.email,
                  password: user.password
                };
                const token = jwt.sign(tokenPayload, keys.JWT.TOKEN_SECRET, {expiresIn: '30m'} );
                res.send({ status: true, name: user.name, token: token });
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out successfully");
});

module.exports = router;
