const errorUtils = require('../utils/errorUtils')

const noteController = (noteModel) => {
    const controller = {}

    controller.getNotes = (req, res, next) => {
        const page = req.query.page
        const take = 10
        const skip = (page - 1) * take

        const userId = req.userId

        noteModel.find({userId: userId})
            .skip(skip)
            .limit(take)
            .then(notes => {
                const trimmedNotes = notes.map((note) => {
                    return {
                        id: note._id,
                        title: note.title,
                        content: note.content,
                        isFavorite: note.isFavorite
                    }
                })

                const sortedNotes = trimmedNotes.sort((_, second) => second.isFavorite)

                return {
                    notes: sortedNotes
                }
            })
            .then(trimmedNotes => {
                res.status(200)
                res.json(trimmedNotes)
            })
            .catch(error => next(error))
    }

    controller.saveNote = (req, res, next) => {
        const note = req.body

        if (!note) {
            next(errorUtils.notFound())
        }

        if (!req.user) {
            next(errorUtils.unauthorized())
        }

        const newNote = {
            userId: req.user._id,
            title: note.title,
            content: note.content,
            isFavorite: false
        }

        noteModel(newNote).save()
            .then(() => {
                res.status(200)
                res.json({message: 'Note saved!'})
            })
            .catch(error => next(error))
    }

    controller.deleteNoteById = (req, res, next) => {
        noteModel.findById(req.query.noteId)
            .then((note, error) => {
                    if (error) {
                        next(error)
                    }

                    if (!note) {
                        next(errorUtils.notFound())
                    }

                    return note.remove()
                }
            )
            .then(() => {
                res.status(200)
                res.json({message: 'Note deleted!'})
            })
            .catch(error => next(error))
    }

    controller.setNoteFavorite = (req, res, next) => {
        noteModel.findById(req.query.noteId)
            .then(note => {
                if (!note) {
                    next(errorUtils.notFound())
                }

                return note.update({isFavorite: !note.isFavorite})
            })
            .then(() => {
                res.status(200)
                res.json({message: "Success"})
            })
            .catch(error => next(error))
    }

    return controller
}

module.exports = noteController
