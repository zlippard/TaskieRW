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
const User = require('./db/model/userSchema')
const userController = require("./controller/userController")

const controller = userController(User(mongoose))

//application & routing

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
require('./routes/index')(app, {userController: controller}) //routes(controller)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(config.port, () => {
    console.log('Server is up m8')
})

module.exports = app