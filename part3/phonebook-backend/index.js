const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const PhoneNumber = require('./models/phoneNumber')

app.use(express.json())
app.use(express.static('build'))

let tiny = ':method :url :status :res[content-length] - :response-time ms'
morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(tiny + ' ' + ':body'))
app.use(cors())


app.get('/info', (request, response) => {
  PhoneNumber.countDocuments({}).then(result => {
    console.log(result)
    response.send(`Phonebook has info for ${result} people <br />
     ${new Date().toUTCString()}`)
  })

})

app.get('/api/persons', (request, response) => {
  PhoneNumber.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {

  PhoneNumber.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  PhoneNumber.findByIdAndRemove(id)
    .then(() => response.sendStatus(204))
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body

  // if (!person.name || !person.number) {
  //   response.status(400).send("Request body must include both a name and number");
  //   return;
  // }

  const newEntry = new PhoneNumber({ name: person.name, number: person.number })
  PhoneNumber.findOne({ name: person.name }).then(person => {
    if (person) {
      response.status(400).send({ error: 'Person with that name already exists' })
    } else {
      newEntry.save().then(person => response.json(person))
        .catch(err => next(err))
    }
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  PhoneNumber.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

