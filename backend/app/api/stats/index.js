const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { Console } = require('../../utils/logger')

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
      res.status(200).json(stats)
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
      console.log('ok')
      let stats = Stats.get().find((i) => i.userId === userId)
      console.log(!stats)
      console.log(typeof req._startTime)
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
