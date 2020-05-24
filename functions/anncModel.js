const Joi = require('@hapi/joi')

exports.schema = Joi.object({
   category: Joi.string().required(),
   audience: Joi.string().required(),
   evnt_title: Joi.string().required(),
   evnt_date: Joi.string(),
   evnt_loc: Joi.string(),
   cont_name: Joi.string(),
   cont_email: Joi.string().email(),
   num_weeks: Joi.number(),
   description: Joi.string().required(),
   url: Joi.string(),
   sub_name: Joi.string().required(),
   sub_email: Joi.string().email().required()
})
