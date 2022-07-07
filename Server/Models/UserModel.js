const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    id: String,
    firstname: String,
    lastname: String,
    phoneNumber: String,
    age: String,
    gender: String,
    avatar: String
})

module.exports = model('user', UserSchema)