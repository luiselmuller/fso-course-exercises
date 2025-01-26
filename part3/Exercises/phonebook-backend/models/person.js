const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to database')

mongoose.set('strictQuery', true)
mongoose.connect(url)
  .then(
    () => console.log('connected to database')
  )
  .catch(
    error => console.log('error connecting to database', error)
  )

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{6,}$/.test(v)
      }
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)