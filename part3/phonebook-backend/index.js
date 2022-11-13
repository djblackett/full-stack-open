const express = require('express')
const morgan = require('morgan');
const app = express()

app.use(express.json());
let tiny = ":method :url :status :res[content-length] - :response-time ms";
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(tiny + " " + ":body"));

  let persons =  [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br />
    ${new Date().toUTCString()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === Number(id));

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== Number(id));
    response.sendStatus(204);
})

app.post('/api/persons', (request, response) => {
    const person = request.body;

    if (!person.name || !person.number) {
        response.status(400).send("Request body must include both a name and number");
        return;
    }

    if (persons.map(person => person.name).includes(person.name)) {
        response.status(400).send("Name must be unique");
        return;
    }
    person["id"] = Math.floor((Math.random() * 10000));
    persons.push(person);
    response.json(person);
});


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});