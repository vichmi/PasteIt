const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasteSchema = new Schema({
    text: String,
    id: String,
    createdAt: Date,
    name: String,
    language: String,
    expiration: String,
    visability: String
})

const Paste = mongoose.model('paste', PasteSchema)

module.exports = Paste;