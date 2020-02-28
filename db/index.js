const config = require('../config')

const database = {}

database.connectToDatabase = database => database.connect(config.DB_URL)
    .then(() => console.log("connected to database"))
    .catch((error) => console.log(error))

module.exports = database