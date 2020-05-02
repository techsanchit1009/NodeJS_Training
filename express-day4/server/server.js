const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000;
const app = express();
const loginRouter = require('./routes');
const {sessionStorage} = require('./sessionStorage');

const userData = [];
let headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
}

app.use(bodyParser.json());
app.use(cors(headers));
app.use('/about-us', express.static('aboutUs'));

function addDate(req, res, next){
  let newBody = {
    ...req.body,
    created_on: new Date(Date.now()).toString()
  }
  req.body = newBody;
  next();
}

const sessionValidator = (req, res, next) => {
  let sessionId = req.params.sessionId;
  if(sessionId){
    const requestSession = sessionStorage.find(session => session.id === sessionId);
    if(requestSession.expiryDate < Date.now()){
      req.valid = false;
    } else {
      req.valid = true;
    }
  } else {
    req.valid = false;
  }
  next();
}

app.use("/login", loginRouter);

app.route('/users.json/:sessionId')
  .get(sessionValidator, (req,res) => {
    if(req.valid){
      res.send(JSON.stringify(userData));
    } else {
      res.send('Session has expired');
    }
  })

  .delete(sessionValidator, (req, res) => {
    if(req.valid){
      const deleteIndex = req.query.id;
      userData.splice(deleteIndex, 1);
      res.send(JSON.stringify(userData));
    } else {
      res.send('Session has expired');
    }
  })

  .post(sessionValidator, addDate, (req, res) => {
    if(req.valid){
      userData.push(req.body);
      res.send(true);
    } else {
      res.send(false);
    }
  });

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
