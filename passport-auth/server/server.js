const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const passport = require('passport');
const app = express();

let headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
}

app.use(cors(headers));

// Passport config
require('./config/passport-local')(passport);
require('./config/passport-google')(passport);


app.use(bodyParser.json());


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth.route'));




mongoose.connect("mongodb://localhost:27017/authdb", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})