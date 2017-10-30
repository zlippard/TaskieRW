const router = require('express').Router()
const tokenUtils = require('../../utils/tokenUtils')

const factory = controller => {
    router.use((req, res, next) => {
        tokenUtils.validateToken(req, res, next)
    })

    router.get('/', controller.getAll)
    router.get('/:id', controller.getById)

    router.delete('/', controller.delete)
    router.delete('/:id', controller.deleteUser)

    return router
}

module.exports = factory