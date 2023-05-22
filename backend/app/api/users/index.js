const { Router } = require('express')

const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const users = User.get()
    res.status(200).json(users)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:id', (req, res) => {
  try {
    const user = User.getById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    const user = User.update(req.params.id, req.body)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    User.delete(req.params.id)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
