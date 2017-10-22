const router = require('express').Router()

const userRouter = (userController) => {
    return require('./user')(userController)
}

const authRouter = (authController) => {
    return require('./auth')(authController)
}

module.exports = (controllers) => {
    router.use('/user', userRouter(controllers.userController))
    router.use('/', authRouter(controllers.authController))

    return router
}