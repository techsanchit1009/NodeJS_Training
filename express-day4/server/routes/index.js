const express = require("express");
const session = require("express-session");
const router = express.Router();
const {sessionStorage} = require('../sessionStorage');


router.use(
  session({
    secret: "loginSecretData",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 1000 },
  })
);

let sessionData = {};

router
  .route("/")
  .get((req, res) => {
    sessionData = req.session;
    res.send(sessionStorage);
  })
  .post((req, res) => {
    sessionData = req.session;
    sessionData.email = req.body.email;
    sessionData.password = req.body.password;

    let userSession = {
      id: req.sessionID,
      email: req.session.email,
      expiryDate: Date.now() + req.session.cookie.originalMaxAge    
    };
    sessionStorage.push(userSession);
    res.send(userSession);
  });

  
module.exports = router;


