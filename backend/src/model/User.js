const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pastes: [{text: String, id: String, name: String, language: String, expiration: String, visability: String}]
})

const User = mongoose.model('user', UserSchema)

module.exports = User;