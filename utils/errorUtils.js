const statusCodes = require('http-status-codes')

const errorUtils = {}

errorUtils.unauthorized = () => {
    const error = new Error()
    error.inDomain = true
    error.statusCode = statusCodes.UNAUTHORIZED

    return error
}

errorUtils.notVerified = () => {
    const error = new Error()
    error.inDomain = true
    error.statusCode = statusCodes.UNAUTHORIZED
    error.message = 'Not verified'

    return error
}

errorUtils.notFound = () => {
    const error = new Error()
    error.inDomain = true
    error.statusCode = statusCodes.INTERNAL_SERVER_ERROR
    error.message = 'Not found'

    return error
}

errorUtils.alreadyVerified = () => {
    const error = new Error()
    error.inDomain = true
    error.statusCode = statusCodes.UNAUTHORIZED
    error.message = 'Already verified'

    return error
}

module.exports = errorUtils