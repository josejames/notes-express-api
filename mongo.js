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
