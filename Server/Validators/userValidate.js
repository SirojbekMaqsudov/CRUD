const Joi = require("joi")

const UserSchema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    phoneNumber: Joi.string().required(),
    age: Joi.string().required(),
    gender: Joi.string().required(),
    avatar: Joi.any()
})

module.exports = data => UserSchema.validate(data)