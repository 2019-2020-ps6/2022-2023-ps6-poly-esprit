const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  type: Joi.string(),
  value: Joi.string(),
  isCorrect: Joi.boolean(),
  questionId: Joi.string(),
})
