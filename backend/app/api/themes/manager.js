const { Theme, Quiz } = require('../../models')
const {filterQuizzesByTheme} = require("./quizzes/manager");
const {filterQuestionsFromQuizz} = require("./quizzes/questions/manager");

/**
 * Function buildTheme.
 * This function aggregates the quizzes from the database to build a theme with all the data needed by the clients.
 * @param themeId
 */
const buildTheme = (themeId) => {
    const theme = Theme.getById(themeId)
    const quizzes = filterQuizzesByTheme(themeId)
    console.log("getQuizzes dans buildTheme", quizzes)
}


/**
 * Function buildThemes.
 * This function aggregates the quizzes questions and answers from the database to build entire themes.
 */
const buildThemes = () => {
    const themes = Theme.get()
    const quizzes = Quiz.get()
    quizzes.forEach((quiz) => { quiz.questions = filterQuestionsFromQuizz(quiz.id) })
    themes.forEach((theme) => { theme.quizzes = quizzes.filter((quiz) => quiz.themeId === theme.id) })
    return themes

}

module.exports = {
    buildThemes,
    buildTheme,
}