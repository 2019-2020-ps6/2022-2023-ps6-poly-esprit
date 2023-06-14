const { Router } = require('express')
const UserRouter = require('./users')
const StatsRouter = require('./stats')

const QuizzesRouter = require('./quizzes')

const router = new Router()

router.get('/status', (req, res) => res.status(200).json("ok"))//Simon n'a pas installé postman
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/stats', StatsRouter)

module.exports = router
