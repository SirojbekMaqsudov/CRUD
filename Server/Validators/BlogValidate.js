const Joi = require("joi")

const BlogSchema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    message: Joi.string().min(20).required()
})


module.exports = data => BlogSchema.validate(data)