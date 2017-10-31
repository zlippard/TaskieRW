const config = require('../config')

const database = {}

database.connectToDatabase = database => database.connect(config.DB_URL)

module.exports = database