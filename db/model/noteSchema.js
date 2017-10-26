const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    userId: String,
    title: String,
    content: String,
    isFavorite: Boolean
})

const NoteModel = mongoose.model('Note', NoteSchema)

module.exports = NoteModel