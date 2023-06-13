const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')


module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  themeId: Joi.number(),
  // faire gaffe ici j'ai sup le required
})
