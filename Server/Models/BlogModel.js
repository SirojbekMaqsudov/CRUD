const {Schema, model} = require("mongoose")


const BlogSchema = new Schema({
    id: Number,
    title: String,
    message: String,
    url: String
})


module.exports = model("blog", BlogSchema)