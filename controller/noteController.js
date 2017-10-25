const errorUtils = require('../utils/errorUtils')

const noteController = (noteModel) => {
    const controller = {}

    controller.getNotes = (req, res, next) => {
        noteModel.find({userId: req.user._id})
            .then((notes) => {
                return {
                    notes: notes.map((note) => {
                        return {
                            id: note._id,
                            title: note.title,
                            content: note.content
                        }
                    })
                }
            })
            .then((trimmedNotes) => {
                res.status(200)
                res.json(trimmedNotes)
            })
            .catch((error) => {
                next(error)
            })
    }

    controller.saveNote = (req, res, next) => {
        const note = req.body

        if (!note) {
            throw 500 //todo handle error cases properly leptejebo
        }

        if (!req.user) {
            throw errorUtils.unauthorized()
        }

        const newNote = {
            userId: req.user._id,
            title: note.title,
            content: note.content
        }

        noteModel(newNote).save()
            .then(() => {
                res.status(200)
                res.json({
                    message: 'Note saved!'
                })
            })
            .catch((error) => {
                next()
                throw error
            })
    }

    controller.deleteNoteById = (req, res, next) => {
        noteModel.findById(req.body.id)
            .then((note, error) => {
                    if (error) {
                        throw  error
                    }

                    if (!note) {
                        throw 500 //todo handel
                    }

                    return note.remove()
                }
            )
            .then(() => {
                res.status(200)
                res.json({
                    message: 'Note deleted!'
                })
            })
            .catch((error) => {
                next(error)
                throw error
            })
    }

    return controller
}

module.exports = noteController
