/*
modèle de la structure :
    id: int,
    stats: {
      "clicks": [
        {
          type: "rangeArea",
          name: "Min-Max",
          data: [
            {
              x: "date",
              y: [
                int_maxi,
                int_mini
              ]
            },
            {
              x: "date",
              y: [
                int_maxi,
                int_mini
              ]
            }
          ]
        },
        {
          type: "line",
          name: "moyenne",
          data: [
            {
              x: "date",
              y: int_mean
            },
            {
              x: "date",
              y: int_mean
            }
          ]
        }
      ],
      "responses": [
        {
          type: "rangeArea",
          name: "Min-Max",
          data: [
            {
              x: "date",
              y: [
                int_maxi,
                int_mini
              ]
            },
            {
              x: "date",
              y: [
                int_maxi,
                int_mini
              ]
            }
          ]
        },
        {
          type: "line",
          name: "moyenne",
          data: [
            {
              x: "date",
              y: int_mean
            },
            {
              x: "date",
              y: int_mean
            }
          ]
        }
      ]
    }

*/

const Joi = require('joi');

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

const statsSchema = Joi.object({
  id: Joi.number().required(),
  stats: Joi.object({
    clicks: Joi.array().items(statsTypeSchema).required(),
    responses: Joi.array().items(statsTypeSchema).required(),
  }).required(),
});

module.exports = statsSchema;


/*
module.exports = new BaseModel('Stats', {
  id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().required(),
  pathology: Joi.number().required(),
  path_pp: Joi.string().required(),
})*/
