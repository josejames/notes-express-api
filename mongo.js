require('dotenv').config()
const mongoose = require('mongoose')
// const password = require('./passwords.js')
// const connectionString = `mongodb+srv://decentra_user:${password}@cluster0.ixyz7.mongodb.net/notes?retryWrites=true&w=majority`
const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
    .then(() => {
        console.log("Database connected")
    }).catch( err => {
        console.error(`Database connection error - `,err)
    })

/// Schema - Contract
// const noteSchema = new Schema({
//     content: String,
//     date: Date,
//     important: Boolean
// })

// /// Model
// const Note = model('Note', noteSchema)

// Note.find({ content: 'hoal'}).then( result => {
//     console.log(result);
//     mongoose.connection.close()
// })

// const note = new Note({
//     content: 'Mongo db is amazing',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then( result => {
//         /// returns the saved object model
//         console.log(result);
//         mongoose.connection.close()
//     }).catch( err => {
//         console.error(err)
//     })