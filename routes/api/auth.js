const router = require('express').Router()

const factory = controller => {
    router.post('/register', controller.register)
    router.post('/login', controller.login)

    router.get('/login/:verificationCode', controller.verifyUser)

    return router
}

module.exports = factory