

const mongoose = require('mongoose')
require('dotenv').config();


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI;

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String
});

const PhoneNumber = mongoose.model('phoneNumber', phoneNumberSchema)

if (process.argv.length === 5) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
            const entry = new PhoneNumber({
                name: process.argv[3],
                number: process.argv[4],
            })
            return entry.save()
        })
        .then(() => {
            console.log("added", process.argv[3], 'number', process.argv[4], "to phonebook")
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then((result) => {
            PhoneNumber.find().then(result => {
                result.forEach(number => {
                    console.log(number.name, number.number)
                })
                mongoose.connection.close();
            })
        });
}