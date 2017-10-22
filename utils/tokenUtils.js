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

    const user = userModel.findOne({id: tokenUser.id})

    if (!user) {
        return next(errorUtils.unauthorized())
    }

    //everything's alright, set the user and pass on
    req.user = tokenUser
    next()
}

module.exports = tokenUtils