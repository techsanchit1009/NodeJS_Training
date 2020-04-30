const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000;
const app = express();

const userData = [];

app.use(bodyParser.json());

let headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
}

app.use(cors(headers));

app.route('/users.json')
  .get((req, res) => {
    res.send(JSON.stringify(userData));
  })
  .delete((req, res) => {
    userData.splice(req.query.id, 1);
    res.send(JSON.stringify(userData));
  })
  .post(addDate, (req, res) => {
    userData.push(req.body);
    res.send(JSON.stringify(userData));
  });

app.use('/about-us', express.static('aboutUs'));

// app.get('/users.json', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send(JSON.stringify(userData));
// });

// app.delete('/users.json', cors(), (req, res) => {
//   userData.splice(req.query.id, 1);
//   res.send(JSON.stringify(userData));
// });

// app.options('/users.json', cors());

// app.post('/users.json', cors(), addDate, (req, res) => {
//   userData.push(req.body);
//   res.send(JSON.stringify(userData));
// });


function addDate(req, res, next){
  let newBody = {
    ...req.body,
    created_on: new Date(Date.now()).toString()
  }
  console.log(req.body);
  req.body = newBody;
  console.log(req.body)
  next();
}


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})