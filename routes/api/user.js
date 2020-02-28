const router = require('express').Router()
const tokenUtils = require('../../utils/tokenUtils')

const factory = controller => {
    router.use((req, res, next) => {
        tokenUtils.validateToken(req, res, next)
    })

    router.get('/profile', controller.getProfile)
    return router
}

module.exports = factory