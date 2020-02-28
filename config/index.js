const constants = require('./constants')

const config = {
    DB_URL: process.env[constants.envKeys.databaseUrl],
    PORT: process.env[constants.envKeys.port],
    VERIFICATION_SECRET: process.env[constants.envKeys.verificationSecret],
    BASE_URL: process.env[constants.envKeys.baseUrl]
}

module.exports = config