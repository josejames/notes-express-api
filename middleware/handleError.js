module.exports = (error, request, response, next) => {
    console.error(error)
    console.error(error.name)
    if( error.name === 'CastError') {
        response.statusMessage = "The id is mal formed, cast error"
        response.status(400).send({ error: response.statusMessage })
    } else {
        response.status(503).send({ error: "handling errors on middleware"})
    }
}