const express = require('express')
const path = require('path')


const controller = require("./routes/users")
const factory = require('./routes/index')(controller)

const app = express()

app.use('/api/', factory)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(3000, () => console.log('Server up wiwi'))

module.exports = app