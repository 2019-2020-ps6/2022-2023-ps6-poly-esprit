const { Router } = require('express')
const UserRouter = require('./users')
const StatsRouter = require('./stats')

const ThemeRouter = require ('./themes')
// const QuizzesRouter = require('./themes/quizzes')

const router = new Router()

router.use('/themes', ThemeRouter)
router.get('/status', (req, res) => res.status(200).json("ok"))//Simon n'a pas installé postman
router.use('/users', UserRouter)
router.use('/stats', StatsRouter)


module.exports = router
