const config = require("./config")

function connectToDatabase(database) {
    database.connect(config.databaseUrl)
}

module.exports = connectToDatabase