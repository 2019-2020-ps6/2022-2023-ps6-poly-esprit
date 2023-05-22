const { Router } = require('express')

const QuizzesRouter = require('./quizzes')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json("Simon n'a pas installer postman"))
router.use('/quizzes', QuizzesRouter)


module.exports = router
