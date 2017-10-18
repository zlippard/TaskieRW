const express = require('express')

const router = express.Router()

function factory(controller) {
    router.get("/user", controller.getAll)

    return router
}

module.exports = factory