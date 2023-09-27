const database = {}

// const uri = "mongodb+srv://heroku_4xs44bgj:Mmo66920f@cluster-4xs44bgj.if8cx.mongodb.net/heroku_4xs44bgj?retryWrites=true&w=majority"
const uri = "mongodb+srv://zlippard:IX6ugwTZYPYSeQjZ@taskie-kodeco-db.ga6e3bg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

database.connectToDatabase = database => database.connect(
    uri, {
        useNewUrlParser: true
    })
    .then((database) => {
        console.log("connected to database")
        console.log(database)
    })
    .catch((error) => console.log(error))

module.exports = database
