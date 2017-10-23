const config = require("./config")

const databaseIndex = {}

databaseIndex.connectToDatabase = (database) => {
    database.connect(config.databaseUrl)
}

module.exports = databaseIndex