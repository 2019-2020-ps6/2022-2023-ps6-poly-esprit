const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

const meanDataSchema = Joi.object({
  x: Joi.string(),
  y: Joi.number(),
});

const rangeDataSchema = Joi.object({
  x: Joi.string(),
  y: Joi.array().items(Joi.number(), Joi.number()),
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

const newStatsTypeSchema = Joi.object({
  date: Joi.string().required(),
  data: Joi.array().items(Joi.number()).required(),
});


const newStatsSchema = {
  userId: Joi.number().required(),
  stats: Joi.object({
    clicks: Joi.array().items(newStatsTypeSchema).required(),
    responses: Joi.array().items(newStatsTypeSchema).required(),
  }).required(),
};

module.exports = new BaseModel('Stats', statsSchema);
// module.exports = new BaseModel('Stats', newStatsSchema);

/*
New model :

[
  {
    "userId": 1684739166638,
    "stats": {
      "clicks": [
            {
              "date": "01/05",
              "data": [
                59,
                87
              ]
            }
          ]
      "responses": [
            {
              "date": "01/05",
              "data": [
                23,
                26
              ]
            }
          ]

    },
    "id": 1684743377162
  },
]
*/

/*
 Current model :

 [
  {
    "userId": 1684739166638,
    "stats": {
      "clicks": [
        {
          "type": "rangeArea",
          "name": "Min-Max",
          "data": [
            {
              "x": "01/05",
              "y": [
                59,
                87
              ]
            }
          ]
        },
        {
          "type": "line",
          "name": "moyenne",
          "data": [
            {
              "x": "01/05",
              "y": 78
            }
      ],
      "responses": [
        {
          "type": "rangeArea",
          "name": "Min-Max",
          "data": [
            {
              "x": "01/05",
              "y": [
                23,
                26
              ]
            }
          ]
        },
        {
          "type": "line",
          "name": "moyenne",
          "data": [
            {
              "x": "01/05",
              "y": 23
            }
          ]
        }
      ]
    },
    "id": 1684743377162
  }
]
*/