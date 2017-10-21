const router = require('express').Router()

const userRouter = (userController) => {
    return require('./user')(userController)
}

module.exports = (controllers) => {
    router.use('/user', userRouter(controllers.userController))

    return router
}