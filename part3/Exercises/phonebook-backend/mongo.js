const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give a password as an argument')
    process.exit(1)
}

let password = process.argv[2]
let name = process.argv[3]
let number = process.argv[4]

const url = `mongodb+srv://luisel:${password}@fso.opw2d.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number
})

if (process.argv[2] && !(process.argv[3] && process.argv[4])) {
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
    })
        mongoose.connection.close()
    })
}
else {
    person.save().then(result => {
        console.log(`Added ${result.name}, number: ${result.number} to the database`)
        mongoose.connection.close()
    })
}


