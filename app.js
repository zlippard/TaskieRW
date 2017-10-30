const app = require('express')()
const path = require('path')
const bodyParser = require('body-parser')

//setup environment variables
require('dotenv').config({path: './env/development'})
const config = require('./db/config')

//database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

require('./db/index').connectToDatabase(mongoose)

//models
const UserModel = require('./db/model/userSchema')
const NoteModel = require('./db/model/noteSchema')

//controllers
const user = require('./controller/userController')
const auth = require('./controller/authController')
const note = require('./controller/noteController')
const social = require('./controller/socialController')

const userController = user(UserModel, NoteModel)
const authController = auth(UserModel)
const noteController = note(NoteModel)
const socialController = social(UserModel)

//application & routing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./routes/index')(app, {
    userController: userController,
    authController: authController,
    noteController: noteController,
    socialController: socialController
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(config.PORT, () => console.log('Server is up m8'))

module.exports = app