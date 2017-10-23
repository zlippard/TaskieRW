const router = require('express').Router()

const userRouter = (userController) => {
    return require('./user')(userController)
}

const authRouter = (authController) => {
    return require('./auth')(authController)
}

const noteRouter = (noteController) => {
    return require('./note')(noteController)
}

module.exports = (controllers) => {
    router.use('/user', userRouter(controllers.userController))
    router.use('/', authRouter(controllers.authController))
    router.use('/note', noteRouter(controllers.noteController))

    return router
}