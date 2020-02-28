const httpStatus = require('http-status-codes')

/**
 * Middleware for handling errors
 * @param req {Object} - contains information about the HTTP request
 * @param res {Object} - used for sending back desired HTTP response
 * @param next
 */

const errorHandler = (error, req, res, next) => {
    console.log(error)

    let statusCode = error.status || httpStatus.INTERNAL_SERVER_ERROR

    res.status(statusCode).send({
        message: error.message,
        error: error.extra || 'Error',
        statusCode
    })
}

// Export middleware
module.exports = errorHandler