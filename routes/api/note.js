const router = require('express').Router()
const tokenUtils = require('../../utils/tokenUtils')

const factory = (controller) => {
    router.use((req, res, next) => {
        tokenUtils.validateToken(req, res, next)
    })

    router.get('/', controller.getNotes)

    router.post('/', controller.saveNote)

    router.delete('/:id', controller.deleteNoteById)

    return router
}

module.exports = factory