const router = require('express').Router()

const userRouter = userController => require('./user')(userController)
const authRouter = authController => require('./auth')(authController)
const noteRouter = noteController => require('./note')(noteController)
const socialRouter = socialController => require('./social')(socialController)

module.exports = controllers => {
    router.use('/user', userRouter(controllers.userController))
    router.use('/', authRouter(controllers.authController))
    router.use('/note', noteRouter(controllers.noteController))

    return router
}