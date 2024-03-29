const { Quiz, Question, Answer} = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error.js')
/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterQuestionsFromQuizz = (quizId) => {
  const questions = deepCopy(Question.get())
  const answers = deepCopy(Answer.get())
  const parsedId = parseInt(quizId, 10)
  questions.forEach((question) => { question.answers = answers.filter((answer) => answer.questionId === question.id) })
  return questions.filter((question) => question.quizId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the quizId in the question is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 */

const getQuestionFromQuiz = (quizId, questionId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = deepCopy(Quiz.getById(quizId))
  const quizIdInt = parseInt(quizId, 10)
  const question = deepCopy(Question.getById(questionId))
  if (question.quizId !== quizIdInt) throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not found`)
  return question
}

module.exports = {
  filterQuestionsFromQuizz,
  getQuestionFromQuiz,
}
