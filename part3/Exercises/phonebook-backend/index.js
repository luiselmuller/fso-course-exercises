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

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  let id = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
  return id
}

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
          `;
          response.send(page)
        }
    ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => 
      response.status(204).end()
    )
    .catch(error => next(error))

  
})

app.post('/api/persons', (request, response) => {
    morgan.token('body', (request, response ) => { return JSON.stringify(request.body) })

    const body = request.body

    if (!body.name) {
      return response.status(400).json({
      error: 'Name is missing'
      })
    }

    if (!body.number) {
      return response.status(400).json({
      error: 'Number is missing'
      })
    }

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

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})