const Joi = require('joi');

exports.userLoginValidation = {
    body: Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().min(8).max(12).required().label("password"),
    }),
  };