const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(
  session({
    secret: "loginSecretData",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60000 },
  })
);
// router.use(bodyParser.json());

let sessionData = {};
let sessionStorage = [];

const sessionMiddleware = (req, res, next) => {
  sessionData = req.session;
  // console.log(sessionData);
  console.log(req.sessionID);
  // const x = sessionStorage.find(data => data.expiryDate > Date.now());
  // console.log(x);
  next();
};

router
  .route("/")
  .get(sessionMiddleware, (req, res) => {
    sessionData = req.session;
    // console.log(sessionStorage);
    res.send(sessionStorage);
  })
  .post(sessionMiddleware, (req, res) => {
    sessionData = req.session;
    sessionData.email = 'req.body.email';
    sessionData.password = 'req.body.password';

    let userSession = {
      id: req.sessionID,
      email: req.session.email,
      expiryDate: Date.now() + req.session.cookie.originalMaxAge    
    };
    sessionStorage.push(userSession);
    res.send(userSession);
  });

module.exports = (app) => {
  app.use("/login", router);
};
