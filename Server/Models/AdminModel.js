const {Schema, model} = require("mongoose")

const AdminSchema = new Schema({
    username: String,
    password: String
})

module.exports = model("admin", AdminSchema)