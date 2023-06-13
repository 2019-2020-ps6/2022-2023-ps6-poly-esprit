const { Quiz, Question } = require('../../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = deepCopy(Quiz.getById(quizId))
  const questions = filterQuestionsFromQuizz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  console.log("THIS ITEMS : ", Quiz.get());
  return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
const buildQuizzes = () => {
  const quizzes = Quiz.get().map((quiz) => deepCopy(quiz));
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}


const filterQuizzesByTheme = (themeId) => {
  const quizzes = Quiz.get()
  const questions = Question.get()
  questions.forEach((question) => { question.answers = filterAnswersFromQuestion(question.id) })
  quizzes.forEach((quiz) => { quiz.questions = questions.filter((question) => question.quizId === quiz.id) })
  const parsedId = parseInt(themeId, 10)
  return quizzes.filter((quiz) => quiz.themeId === parsedId)
}

module.exports = {
  buildQuizz,
  buildQuizzes,
  filterQuizzesByTheme,
}
