const router = require('express').Router()

const factory = controller => {
    router.post('/register', controller.register)
    router.post('/login', controller.login)

    return router
}

module.exports = factory