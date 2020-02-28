const statusCodes = require('http-status-codes')

const errorUtils = {}

errorUtils.unauthorized = () => {
    const error = new Error()
    error.errorMessage = "Unauthorized"
    error.message = "Unauthorized"
    error.statusCode = statusCodes.UNAUTHORIZED
    error.code = statusCodes.UNAUTHORIZED

    return error
}

errorUtils.notVerified = () => {
    const error = new Error()
    error.code = statusCodes.UNAUTHORIZED
    error.message = "Not verified"
    error.statusCode = statusCodes.UNAUTHORIZED
    error.errorMessage = 'Not verified'

    return error
}

errorUtils.notFound = () => {
    const error = new Error()
    error.code = statusCodes.INTERNAL_SERVER_ERROR
    error.errorMessage = 'Not found'
    error.statusCode = statusCodes.INTERNAL_SERVER_ERROR
    error.message = 'Not found'

    return error
}

errorUtils.alreadyVerified = () => {
    const error = new Error()
    error.code = statusCodes.UNAUTHORIZED
    error.errorMessage = 'Already verified'

    return error
}

module.exports = errorUtils