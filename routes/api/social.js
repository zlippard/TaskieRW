const router = require('express').Router()

const factory = (controller) => {
    router.post('/google/login', controller.googleLogin)
    router.post('/facebook/login', controller.facebookLogin)

    return router
}

module.exports = factory