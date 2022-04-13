require('./mongo')
const express = require('express')
const handleError = require('./middleware/handleError')
const notFound = require('./middleware/notFound')
const app = express()

const Note = require('./models/Note')

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h3>Hello World form express with demon</h3>')
})

app.get('/notes', (request, response) => {
    Note.find({})
        .then( result => {
            response.json(result)
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
})

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
})

app.use(notFound)
app.use(handleError)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})