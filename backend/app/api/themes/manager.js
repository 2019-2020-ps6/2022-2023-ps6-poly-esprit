const { Theme } = require('../../models')
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
}


/**
 * Function buildThemes.
 * This function aggregates the quizzes questions and answers from the database to build entire themes.
 */
const buildThemes = () => {
    const themes = Theme.get()
    return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
    buildThemes,
    buildTheme,
}