const errorUtils = require('../utils/errorUtils')

const noteController = (noteModel) => {
    const controller = {}

    controller.getNotes = (req, res, next) => {
        const page = req.query.page
        const take = 10
        const skip = (page - 1) * take

        noteModel.find({userId: req.user._id})
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
            content: note.content,
            isFavorite: false
        }

        noteModel(newNote).save()
            .then(() => {
                res.status(200)
                res.json({
                    message: 'Note saved!'
                })
            })
            .catch((error) => {
                next(error)
            })
    }

    controller.deleteNoteById = (req, res, next) => {
        noteModel.findById(req.query.noteId)
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
                next(error) //todo next(errorMiddleware.handleError(error))
            })
    }

    controller.setNoteFavorite = (req, res, next) => {
        noteModel.findById(req.query.noteId)
            .then(note => {
                if (!note) {
                    throw "Jebiga"
                }

                return note.update({isFavorite: !note.isFavorite})
            })
            .then(() => {
                res.status(200)
                res.json({message: "Success"})
            })
            .catch(error => {
                next(error)
            })
    }

    return controller
}

module.exports = noteController
