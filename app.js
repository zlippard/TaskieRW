const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config({path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV}`)})

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
//const social = require('./controller/socialController')

const userController = user(UserModel, NoteModel)
const authController = auth(UserModel)
const noteController = note(NoteModel)
//const socialController = social(UserModel)

//application & routing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./routes/index')(app, {
    userController: userController,
    authController: authController,
    noteController: noteController
})

const appConstants = require('./config')

// const errorMiddleware = require('./middleware/errorMiddleware')
//
// app.use(errorMiddleware)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(appConstants.PORT, () => console.log('Server is up m8'))

module.exports = app