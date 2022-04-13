require('./mongo')
const express = require('express')
const handleError = require('./middleware/handleError')
const notFound = require('./middleware/notFound')
const app = express()

const Note = require('./models/Note')

app.use(express.json())

// let notes = [
//     { 
//         id: 1,
//         content: "HTML is easy",
//         date: "2022-05-30T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only Javascript",
//         date: "2022-05-30T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2022-05-30T19:20:14.298Z",
//         important: true
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h3>Hello World form express with demon</h3>')
})

app.get('/notes', (request, response) => {
    Note.find({})
        .then( result => {
            response.json(result)
            // response.json(result.map(
            //     note => {
            //         const {_id, __v, ...restOfNote} = note
            //         return {
            //             ...restOfNote,
            //             id: _id
            //         }
            //     }
            // ))
        })
        .catch( err => {
            console.error(err)
        })
    //response.json(notes)
})

app.put('/notes/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    const { id } = request.params
    const body = request.body

    if( !body.content ) {
        return response.status(400).send({error: "You need to provide a body content"})
    }
    console.log(body);
    const note = {
        content: body.content,
        important: body.important || false
    }

    Note.findByIdAndUpdate(id, note, { new: true }).then( result => {
        if( result ) {
            console.log(result);
            response.status(200)
            return response.json(result)
        }
        return response.status(404).end()
    }).catch( err => {
        next(err)
    })
    // const note = notes.find( note => note.id === id)
    // const note = notes.find(
    //     note => {
    //         console.log(note.id, typeof note.id, typeof id, note.id === id);
    //     }
    // )
    // if(note) {
    //     response.json(note)
    // }
    // response.statusMessage = "Ahorita no lo tenemos, compa, vuelva luego"
    // response.status(404).end()
})

app.get('/notes/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    const { id } = request.params

    Note.findById(id).then( result => {
        if( result ) {
            console.log(result);
            return response.json(result)
        }
        return response.status(404).end()
    }).catch( err => {
        next(err)
    })
    // const note = notes.find( note => note.id === id)
    // const note = notes.find(
    //     note => {
    //         console.log(note.id, typeof note.id, typeof id, note.id === id);
    //     }
    // )
    // if(note) {
    //     response.json(note)
    // }
    // response.statusMessage = "Ahorita no lo tenemos, compa, vuelva luego"
    // response.status(404).end()
})

// const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max( ...notes.map( n => n.id) ) : 0
//     return maxId + 1
// }

app.post('/notes', (request, response) => {
    const body = request.body
    
    if( !body.content ) {
        return response.status(400).json({
            error: 'Content Missing, No hay'
        })
    }
   
    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })

    // const note = {
    //     content: body.content,
    //     import:  body.important || false,
    //     date: new Date(),
    //     id: generateId()
    // }
    // notes = notes.concat(note)
    note.save()
    .then( result => {
            console.log(result)
            response.json(result)
        })
        .catch( err => console.error(err) )
})

app.delete('/notes/:id', (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndRemove(id)
        .then( result => {
            return response.status(204).end()
        })
        .catch( error => {
            next(error)
        })

    //notes = notes.filter( note => note.id !== id)
    //response.status(204).end()
})

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

app.use(notFound)
app.use(handleError)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})