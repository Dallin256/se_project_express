const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.nae");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().valid("hot", "warm", "cold").required({
      "string.empty": 'The "weather" field must be filled in',
      "string.invalid":
        'The "weather" field must be either "hot", "warm", or "cold"',
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'the "Email" field must be filled in',
      "string.nae": 'the "Email" field must be a valid Email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'the "password" field must be filled in',
    }),
  }),
});

// module.exports.validateUserId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().alphanum().length(24).messages({
//       "string.empty": "Missing ID",
//       "string.length": "Invalid ID",
//       "string.alphanum": "Invalid ID",
//     }),
//   }),
// });

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().alphanum().length(24).messages({
      "string.empty": "Missing ID",
      "string.length": "Invalid ID",
      "string.alphanum": "Invalid ID",
    }),
  }),
});
