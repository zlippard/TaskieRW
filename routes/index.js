const express = require('express')
const router = express.Router()

function factory(controller) {
    router.get('/user', controller.getAll)

    router.post('/user', controller.saveUser)

    router.get('/user/:id', controller.getById)

    router.delete('/user', controller.delete)

    return router
}

module.exports = factory