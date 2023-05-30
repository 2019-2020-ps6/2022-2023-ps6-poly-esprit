const { Router } = require('express')
const UserRouter = require('./users')

const ThemeRouter = require ('./themes')
// const QuizzesRouter = require('./themes/quizzes')

const router = new Router()

router.get('/status', (req, res) => res.status(200).json("Simon n'a pas installer postman"))
router.use('/themes', ThemeRouter)
// router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)

module.exports = router
