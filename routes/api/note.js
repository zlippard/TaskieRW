const router = require('express').Router()
const tokenUtils = require('../../utils/tokenUtils')

const factory = (controller) => {
    router.use((req, res, next) => {
        tokenUtils.validateToken(req, res, next)
    })

    router.get('/', controller.getNotes)
    router.get('/favorite', controller.getFavoriteNotes)

    router.post('/', controller.saveNote)
    router.post('/favorite', controller.setNoteFavorite)
    router.post('/complete', controller.setNoteCompleted)
    router.post('/edit', controller.editNote)
    router.get('/completed', controller.getCompletedNotes)

    router.post('/delete', controller.deleteNoteById)

    return router
}

module.exports = factory