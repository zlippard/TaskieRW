const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: String,
    passwordHash: String,
    verificationCode: String,
    verified: Boolean
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel