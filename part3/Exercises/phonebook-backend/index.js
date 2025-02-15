require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', request => { return JSON.stringify(request.body) })

//  Deployed to render

app.use(
  morgan(function (tokens, req, res) {
    let addedInfo = req => req.method === 'POST' ? tokens.body(req) : ''

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      addedInfo(req)
    ].join(' ')
  })
)

app.get('/info', (request, response) => {
  response.send('<h1>Phonebook API</h1> <a href="/info/details">Information</a>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(
    result => response.json(result)
  )
})

// done
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if (result) {
        response.json(result)
      }
      else {
        response.status(404).send('404 Person Not Found')
      }
    })
    .catch(error => next(error))
})

// done
app.get('/info/details', (request, response, next) => {
  Person.find({}).then(
    result => {
      const page = `
          <h1>Info</h1>
          <p>There is information for ${result.length} people in the phonebook.</p>
          <p>Last updated: ${new Date()}</p>
        `
      response.send(page)
    }
  ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then( () =>
      response.status(204).end()
    )
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  morgan.token('body', ( request ) => { return JSON.stringify(request.body) })

  const body = request.body

  // if (data.find(p => p.name === body.name)) {
  //   return response.status(400).json({
  //   error: 'Name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // data = data.concat(person)

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})