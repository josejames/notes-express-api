const { model, Schema } = require('mongoose')

/// Schema - Contract
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

/// Model
const Note = model('Note', noteSchema)

module.exports = Note