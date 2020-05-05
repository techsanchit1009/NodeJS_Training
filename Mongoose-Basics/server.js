const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const itemRoutes = require('./items/routes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(itemRoutes);


mongoose.connect("mongodb://localhost:27017/itemsdb", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
});

mongoose.connection.on("error", err => {
  console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
});

app.listen(PORT, () => {
  console.log(`Listening to server at http://localhost:${PORT}`);
});
