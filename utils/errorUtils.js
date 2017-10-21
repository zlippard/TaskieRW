const statusCodes = require('http-status-codes')

const errorUtils = {}

errorUtils.unauthorized = () => {
    const error = new Error()
    error.inDomain = true
    error.statusCode = statusCodes.UNAUTHORIZED

    return error
}

module.exports = errorUtils