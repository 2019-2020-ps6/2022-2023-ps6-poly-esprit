const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { Console } = require('../../utils/logger');
const number = require('joi/lib/types/number');
const { json } = require('body-parser');
const strftime = require('strftime')

const router = new Router();

function checkUserId(red) {
  if (req.query && req.query.userId) {
    try {
      let userId = req.query["userId"];
      if (typeof userId === 'string') {
        userId = parseInt(userId, 10);
      }
      const stats = Stats.get().find((i) => i.userId === userId);
      if (!stats) {
        return false;
      }
    } catch (err) {
      return false;
    };
  }
  else {
    return false;
  }
  return true;
};

function minMaxMean(array) {
  let min = array[0];
  let max = array[0];
  let mean = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
    if (array[i] > max) {
      max = array[i]
    }
    mean += array[i]
  }
  mean /= array.length
  return [min, max, ~~mean]
}

function max(a, b) {
  if (a > b) {
    return a
  }
  return b
}


router.get('/', (req, res) => {
  if (req.query && req.query.userId) {
    try {
      let userId = req.query["userId"]
      if (typeof userId === 'string') {
        userId = parseInt(userId, 10)
      }
      const stats = Stats.get().find((i) => i.userId === userId)
      if (!stats) {
        return res.status(404).json("No stats found for this user")
      }
      if (stats.stats.clicks.length == 0 || stats.stats.responses.length == 0) {
        return res.status(204).json("No stats found for this user")
      }
      let clicks_data = new Array();
      let responses_data = new Array();
      let clicks_mean = new Array();
      let responses_mean = new Array();
      let begin = max(0, stats.stats.clicks.length - 31);
      for (let i = begin; i < stats.stats.clicks.length; i++) {
        let minMaxMeanClicks = minMaxMean(stats.stats.clicks[i]["data"]);
        let minMaxMeanResponses = minMaxMean(stats.stats.responses[i]["data"]);
        clicks_data.push({
          "x": stats.stats.clicks[i].date,
          "y": [
            minMaxMeanClicks[0],
            minMaxMeanClicks[1]
          ]
        });
        clicks_mean.push({
          "x": stats.stats.clicks[i].date,
          "y": minMaxMeanClicks[2]
        });

        responses_data.push({
          "x": stats.stats.responses[i].date,
          "y": [
            minMaxMeanResponses[0],
            minMaxMeanResponses[1]
          ]
        });
        responses_mean.push({
          "x": stats.stats.responses[i].date,
          "y": minMaxMeanResponses[2]
        });
      }
      const retour = {
        userId: userId,
        stats: {
          clicks: [
            {
              type: "rangeArea",
              name: "Min-Max",
              data: clicks_data
            },
            {
              type: "line",
              name: "moyenne",
              data: clicks_mean
            }
          ],
          responses: [
            {
              type: "rangeArea",
              name: "Min-Max",
              data: responses_data
            },
            {
              type: "line",
              name: "moyenne",
              data: responses_mean
            }
          ]
        }
      }
      return res.status(200).json(retour)
    } catch (err) {
      manageAllErrors(res, err)
    }
  }
  else {
    return res.status(417).json("You must provide a userId in the query")
  }
})


router.get('/date', (req, res) => {
  let date = strftime('%d/%m', new Date())
  res.status(200).json(date);
})

router.get('/:userId', (req, res) => {
  try {
    const stats = Stats.getById(req.params.userId)
    res.status(200).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const stats = Stats.create(req.body)
    res.status(201).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    const stats = Stats.update(req.params.id, req.body)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    Stats.delete(req.params.id)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})


/*
 * if the user is not in the database, create it
 * if the user is in the database, update it
 */
router.post('/endgame', (req, res) => {
  // Check if the user is passed in the query
  if (!req.query || !req.query.userId) {
    res.status(417).json("You must provide a userId in the query");
    return;
  }
  // parse the userId
  try {
    let userId = req.query["userId"]
    if (typeof userId === 'string') {
      userId = parseInt(userId, 10)
    }

    // Check if the clicks and responses are passed in the body
    try {
      req.body.clicks
      req.body.responses
    } catch (err) {
      res.status(400).json("You must provide clicks and responses in the body");
      return;
    }

    // Check if the clicks and responses are between 0 and 100
    if (req.body.clicks < 0 || req.body.responses < 0 || req.body.clicks > 100 || req.body.responses > 100) {
      res.status(406).json("clicks and responses must be between 0 and 100");
      return;
    }


    /*
     * Check if the user is in the database
     * if not, create it
     * if yes, update it
     */
    let stats = Stats.get().find((i) => i.userId === userId)
    if (!stats) {
      stats = Stats.create({
        "userId": userId,
        "stats": {
          "clicks": [],
          "responses": []
        }
      })
    }
    let length = stats.stats.clicks.length;
    let clicks_data;

    /*
     * if there is no stats today, create it
     */
    let today = strftime('%d/%m', new Date())
    if (length == 0 || stats.stats.clicks[length - 1].date != today) {
      stats.stats.clicks.push({
        "date": today,
        "data": []
      })
      stats.stats.responses.push({
        "date": today,
        "data": []
      })
      length++;
    }
    // end of the creation of the stats of today

    /*
     * Update the stats of the day
     */
    stats.stats.clicks[length - 1].data.push(req.body.clicks);
    stats.stats.responses[length - 1].data.push(req.body.responses);
    Stats.save();
    res.status(200).json("stats registered");
  } catch (err) {
    manageAllErrors(res, err);
    return;
  }
})

router.get('/endgame', (req, res) => {
  try {
    res.status(200).json("bad way to use the API")
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
