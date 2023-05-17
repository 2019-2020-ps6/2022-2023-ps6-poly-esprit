const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().required(),
  pathology: Joi.number().required(),
  path_pp: Joi.string().required(),
})
