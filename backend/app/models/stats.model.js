const Joi = require('joi');
const BaseModel = require('../utils/base-model.js')

const meanDataSchema = Joi.object({
  x: Joi.string().required(),
  y: Joi.number().required(),
});

const rangeDataSchema = Joi.object({
  x: Joi.string().required(),
  y: Joi.array()
    .items(Joi.number().required(), Joi.number().required())
    .required(),
});

const statsTypeSchema = Joi.object({
  type: Joi.string().required(),
  name: Joi.string().required(),
  data: Joi.array().items(rangeDataSchema, meanDataSchema).required(),
});

const statsSchema = {
  userId: Joi.number().required(),
  stats: Joi.object({
    clicks: Joi.array().items(statsTypeSchema).required(),
    responses: Joi.array().items(statsTypeSchema).required(),
  }).required(),
};

//module.exports = statsSchema;

module.exports = new BaseModel('Stats', statsSchema);