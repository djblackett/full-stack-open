const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const app = express()
require('dotenv').config();
const PhoneNumber = require('./models/phoneNumber')

app.use(express.json());
app.use(express.static('build'));
let tiny = ":method :url :status :res[content-length] - :response-time ms";
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(tiny + " " + ":body"));
app.use(cors())


app.get('/info', (request, response) => {

    response.send(`Phonebook has info for ${persons.length} people <br />
    ${new Date().toUTCString()}`)
});

app.get('/api/persons', (request, response) => {
    PhoneNumber.find({}).then(persons => response.json(persons));
});

app.get('/api/persons/:id', (request, response) => {

    PhoneNumber.findById(request.params.id).then(person => response.json(person)).catch(err => {
        console.log(err);
        response.status(404).end();
    });
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    PhoneNumber.deleteOne({id: id}, (error) => {
        console.log(error);
    })
    response.sendStatus(204);
})

app.post('/api/persons', (request, response) => {
    const person = request.body;



    if (!person.name || !person.number) {
        response.status(400).send("Request body must include both a name and number");
        return;
    }

    // if (persons.map(person => person.name).includes(person.name)) {
    //     response.status(400).send("Name must be unique");
    //     return;
    // }
    // person["id"] = Math.floor((Math.random() * 10000));
    // persons.push(person);
    // response.json(person);

    const newEntry = new PhoneNumber({name: person.name, number: person.number});
    newEntry.save().then(person => response.json(person));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});