const express = require('express');

const app = express();
const port = 5000;
const bodyParser = require('body-parser');
require('dotenv').config();

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
// console.log(dbpw.mongodbpw);

mongoose.connect('mongodb://localhost:27017/myplug', {})

  .then(() => console.log('MongoDB Connected!!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const stationsRouter = require('./routes/Stations');
// 추가된 코드
app.use('/stationsRouter', stationsRouter);
