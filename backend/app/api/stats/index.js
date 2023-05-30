const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { Console } = require('../../utils/logger');
const number = require('joi/lib/types/number');

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
        res.status(404).json("No stats found for this user")
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
        stats:{
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
      res.status(200).json(retour)
    } catch (err) {
      manageAllErrors(res, err)
    }
  }
  else {
      res.status(417).json("You must provide a userId in the query")
  }
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
  console.log(req.query)
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

router.post('/endgame', (req, res) => {
  if (req.query && req.query.userId) {
    try {
      let userId = req.query["userId"]
      if (typeof userId === 'string') {
        userId = parseInt(userId, 10)
      }
      let stats = Stats.get().find((i) => i.userId === userId)
      if (!stats) {
        stats = Stats.create({
          "userId":userId,
          "stats":{
            "clicks": [
              {
                "type": "rangeArea",
                "name": "Min-Max",
                "data": [
                  {
                    "x": req.body.date,
                    "y": [
                      req.body.clicks,
                      req.body.clicks
                    ]
                  }
                ]
              },
              {
                "type": "line",
                "name": "moyenne",
                "data": [
                  {
                    "x": req.body.date,
                    "y": req.body.clicks
                  }
                ]
              }
            ],
            "responses": [
              {
                "type": "rangeArea",
                "name": "Min-Max",
                "data": [
                  {
                    "x": req.body.date,
                    "y": [
                      req.body.responses,
                      req.body.responses
                    ]
                  }
                ]
              },
              {
                "type": "line",
                "name": "moyenne",
                "data": [
                  {
                    "x": req.body.date,
                    "y": req.body.responses
                  }
                ]
              }
            ]
          }
        })
      }
      clicks_data = stats.stats.clicks[0].data;
      console.log(clicks_data)
      console.log(clicks_data[clicks_data.length - 1])
      stats.stats.clicks[0].data.push({
        "x": req.body.date,
        "y": [
          req.body.minClicks,
          req.body.maxClicks
        ]
      })
      stats.stats.clicks[1].data.push({
        "x": req.body.date,
        "y": req.body.meanClicks
      })
      stats.stats.responses[0].data.push({
        "x": req.body.date,
        "y": [
          req.body.minResponses,
          req.body.maxResponses
        ]
      })
      stats.stats.responses[1].data.push({
        "x": req.body.date,
        "y": req.body.meanResponses
      })
      Stats.update(stats.userId, stats)
      res.status(200).json(stats)
    } catch (err) {
      manageAllErrors(res, err)
      return;
    }
  }
  else {
      res.status(417).json("You must provide a userId in the query");
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
