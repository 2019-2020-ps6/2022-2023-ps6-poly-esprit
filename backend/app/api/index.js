const { Router } = require('express')
const UserRouter = require('./users')

const QuizzesRouter = require('./quizzes')

const router = new Router()

router.get('/status', (req, res) => res.status(200).json("Simon n'a pas installer postman"))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)

module.exports = router
