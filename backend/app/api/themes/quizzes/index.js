const { Router } = require('express')

const { Quiz, Theme } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const { buildQuizz, buildQuizzes, filterQuizzesByTheme} = require('./manager')

const router = new Router({ mergeParams: true })

router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = filterQuizzesByTheme(req.params.themeId);
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {

    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
