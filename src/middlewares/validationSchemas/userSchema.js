const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(12)
        .required()
        .messages({
          "string.empty": "이름은 공백일 수 없습니다.",
          "string.min": "이름은 최소 2글자 이상입니다.",
          "string.max": "이름은 최대 12글자 이하입니다.",
          "any.required": "이름은 필수값입니다.",
        }),
});

module.exports = userSchema;