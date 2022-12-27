const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require('../models/Station');
const { Charger } = require('../models/Charger');
const { StationLogs } = require('../models/StationLogs');

router.post('/keco/find/regionData', (req, res, next) => {
  const { x1 } = req.body.data;
  const { x2 } = req.body.data;
  const { y1 } = req.body.data;
  const { y2 } = req.body.data;
  // console.log(req.body);
  Station.find({
    $and: [
      { lng: { $gte: x1 } },
      { lng: { $lte: x2 } },
      { lat: { $gte: y1 } },
      { lat: { $lte: y2 } },
    ],

  }).then((stations) => {
    // console.log(stations);
    // console.log(stations.length)
    if (stations.length > 0) {
      Charger.find({ statId: { $in: stations.map((station) => station.statId) } })
        .then((chargers) => {
          // console.log(chargers.length);
          res.json([stations, chargers]); // 충전소와, 그에 해당하는 충전기들을 한번에 보내준다. (개선판)
        }).catch((err) => {
          console.log(err);
          next(err);
        });
    } else {
      res.json([stations, []]);
    }
  }).catch((err) => {
    console.log(err);
    next(err);
  });
});

module.exports = router;
