const appConstants = require('../config/constants')
const errorUtils = require('../utils/errorUtils')
const tokenService = require('jwt-simple')
const userModel = require('../db/model/userSchema')

const tokenUtils = {}

tokenUtils.validateToken = (req, res, next) => {
    const token = req.query.token || req.headers[appConstants.headers.AUTH]

    if (!token) {
        return next(errorUtils.unauthorized())
    }

    const tokenUser = tokenService.decode(token, process.env.TOKEN_SECRET)

    if (!tokenUser) {
        return next(errorUtils.unauthorized())
    }

    userModel.findById(tokenUser.id)
        .then(user => {
            if (!user) {
                return next(errorUtils.unauthorized())
            }

            req.userId = user._id
            next()
        })
}

tokenUtils.generateToken = user => {
    return tokenService.encode({
        id: user.id,
        email: user.email
    }, process.env.TOKEN_SECRET)
}

module.exports = tokenUtils