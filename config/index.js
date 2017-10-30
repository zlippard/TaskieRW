const constants = require('./constants')
const path = require('path')

//bindaj sve na dotenv
require('dotenv').config({path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV}`)})

const config = {
    DB_URL: process.env[constants.envKeys.databaseUrl],
    PORT: process.env[constants.envKeys.port],
    VERIFICATION_SECRET: process.env[constants.envKeys.verificationSecret],
    FACEBOOK_APP_ID: process.env[constants.envKeys.facebookAppId],
    FACEBOOK_SECRET: process.env[constants.envKeys.facebookSecret]
}

module.exports = config