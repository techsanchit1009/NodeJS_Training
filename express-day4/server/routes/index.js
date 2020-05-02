const express = require("express");
const session = require("express-session");
const axios = require('axios');
const router = express.Router();
const {sessionStorage} = require('../sessionStorage');


router.use(
  session({
    secret: "loginSecretData",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60000 },
  })
);

const githubDataMiddleware = async (req, res, next) => {
  let githubResult = await axios.get(`https://api.github.com/users/${req.body.userName}`);
  req.githubResult = githubResult;
  next();
}

let sessionData = {};

router
  .route("/")
  .get((req, res) => {
    sessionData = req.session;
    res.send(sessionStorage);
  })
  .post(githubDataMiddleware, (req, res) => {
    sessionData = req.session;
    sessionData.userName = req.body.userName;

    let userSession = {
      id: req.sessionID,
      userName: req.session.userName,
      expiryDate: Date.now() + req.session.cookie.originalMaxAge,
      github: req.githubResult.data 
    };
    sessionStorage.push(userSession);
    res.send(userSession);
  });

  
module.exports = router;


