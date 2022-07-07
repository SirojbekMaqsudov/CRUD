const Joi = require("joi")

const UserSchema = Joi.object({
    username: Joi.string().min(3).max(20),
    password: Joi.string().min(8).max(12)
})


module.exports = (data) => UserSchema.validate(data)