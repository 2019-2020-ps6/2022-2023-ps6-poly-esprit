const { Router } = require('express')

const { Theme, Quiz} = require('../../models')
const QuizRouter = require('./quizzes')
const manageAllErrors = require('../../utils/routes/error-management')
const {buildThemes} = require("./manager");

const router = new Router()

router.use('/:themeId/quizzes', QuizRouter)
router.get('/', (req, res) => {
    try {
        const themes = buildThemes()
        res.status(200).json(themes)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/quizzes', (req, res) => {
    try {
        const quizzes = Quiz.get()
        res.status(200).json(quizzes)
    }catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const theme = Theme.create({ ...req.body})
        res.status(200).json(theme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:themeId', (req, res) => {
    try {
        Theme.delete(req.params.themeId)
        res.status(200).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})


module.exports = router