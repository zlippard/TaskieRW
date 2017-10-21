const router = require('express').Router()

function factory(controller) {
    router.get('/', controller.getAll)
    router.get('/:id', controller.getById)

    router.post('/register', controller.register)
    router.post('/login', controller.login)

    router.delete('/', controller.delete)
    router.delete('/:id', controller.deleteUser)

    return router
}

module.exports = factory