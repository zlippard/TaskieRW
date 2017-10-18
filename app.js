const app = require('express')()
const path = require('path')
const bodyParser = require('body-parser')

//setup environment variables
require('dotenv').config({path: './env/development'})
const config = require('./db/config')

//database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

require('./db/index')(mongoose)

//user controller
const User = require('./db/model/user')
const userController = require("./routes/users")

const controller = userController(User(mongoose))

//application & routing
const routes = require('./routes/index')(controller) //routes(controller)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', routes)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(config.port, () => {
    console.log(config.port)
})

module.exports = app