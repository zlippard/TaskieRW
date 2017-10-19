const express = require('express')
const router = express.Router()

function factory(controller) {
    router.get('/user', controller.getAll)
    router.get('/user/:id', controller.getById)

    router.post('/user', controller.register)
    router.post('/login', controller.login)

    router.delete('/user', controller.delete)
    router.delete('/user/:id', controller.deleteUser)

    return router
}

module.exports = factory