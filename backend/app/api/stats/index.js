const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { Console } = require('../../utils/logger')

const router = new Router()

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
    try {
      const stats = Stats.get()
      res.status(417).json("You must provide a userId in the query")
    } catch (err) {
      manageAllErrors(res, err)
    }
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

router.post('/endgame/:userId', (req, res) => {
  try {
    //const stats = Stats.create(req.body)
    console.log(req.body)
    res.status(201).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/endgame/:userId', (req, res) => {
  try {
    //const stats = Stats.create(req.body)
    console.log(req.body)
    res.status(200).json("bad way to use the API")
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
