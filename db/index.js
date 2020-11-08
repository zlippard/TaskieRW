const database = {}

const uri = "mongodb+srv://heroku_4xs44bgj:Mmo66920f@cluster-4xs44bgj.if8cx.mongodb.net/heroku_4xs44bgj?retryWrites=true&w=majority"

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