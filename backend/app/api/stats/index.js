const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { Console } = require('../../utils/logger')

const router = new Router()

router.get('/', (req, res) => {
  console.log('test réussi')
  try {
    const stats = Stats.get()
    res.status(200).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:id', (req, res) => {
  try {
    const stats = Stats.getById(req.params.id)
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

router.put('/:id', (req, res) => {
  try {
    const stats = Stats.update(req.params.id, req.body)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    Stats.delete(req.params.id)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/endgame/:id', (req, res) => {
  try {
    //const stats = Stats.create(req.body)
    console.log(req.body)
    res.status(201).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/endgame/:id', (req, res) => {
  try {
    //const stats = Stats.create(req.body)
    console.log(req.body)
    res.status(200).json("bad way to use the API")
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
