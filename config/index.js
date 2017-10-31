const constants = require('./constants')

const config = {
    DB_URL: process.env[constants.envKeys.databaseUrl],
    PORT: process.env[constants.envKeys.port],
    VERIFICATION_SECRET: process.env[constants.envKeys.verificationSecret],
    EMAIL_PROVIDER:process.env[constants.envKeys.emailProvider],
    EMAIL_PROVIDER_USERNAME:process.env[constants.envKeys.emailProviderUsername],
    EMAIL_PROVIDER_PASSWORD:process.env[constants.envKeys.emailProviderPassword]
}

module.exports = config