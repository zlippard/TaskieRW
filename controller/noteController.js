const errorUtils = require('../utils/errorUtils')

const noteController = (noteModel) => {
    const controller = {}

    controller.getNotes = (req, res, next) => {
        const page = req.query.page

        let take

        if (page) {
            take = 10
        } else {
            take = 1000
        }

        const skip = page ? (page - 1) * take : 0

        const userId = req.userId

        if (!userId) {
            throw errorUtils.unauthorized()
        }

        noteModel.find({userId: userId, isFavorite: false})
            .skip(skip)
            .limit(take)
            .then(notes => {
                const trimmedNotes = notes.map((note) => {
                    return {
                        id: note._id,
                        title: note.title,
                        content: note.content,
                        taskPriority: note.taskPriority ? note.taskPriority : 1,
                        isCompleted: note.isCompleted ? note.isCompleted : false
                    }
                })

                return {
                    trimmedNotes
                }
            })
            .then(trimmedNotes => {
                res.status(200)
                res.json(trimmedNotes)
            })
            .catch(error => res.status(error.code).send(error))
    }

    controller.saveNote = (req, res, next) => {
        const note = req.body

        if (!note) {
            throw errorUtils.notFound()
        }

        if (!req.userId) {
            throw errorUtils.unauthorized()
        }

        const newNote = {
            userId: req.userId,
            title: note.title,
            content: note.content,
            isCompleted: false,
            taskPriority: note.taskPriority
        }

        noteModel(newNote)
            .save()
            .then((savedNote) => {
                res.status(200)
                res.json({
                    id: savedNote._id,
                    userId: savedNote.userId,
                    title: savedNote.title,
                    content: savedNote.content,
                    isCompleted: false,
                    taskPriority: savedNote.taskPriority
                })
            })
            .catch(error => res.status(error.code).send(error))
    }

    controller.deleteNoteById = (req, res, next) => {
        noteModel.findById(req.query.id)
            .then((note, error) => {
                    if (error) {
                        throw error
                    }

                    if (!note) {
                        throw errorUtils.notFound()
                    }

                    return note.remove()
                }
            )
            .then(() => {
                res.status(200)
                res.json({message: 'Note deleted!'})
            })
            .catch(error => res.status(error.code).send(error))
    }

    controller.setNoteCompleted = (req, res, next) => {
        noteModel.findById(req.query.id)
            .then(note => {
                if (!note) {
                    throw errorUtils.notFound()
                }

                return note.update({isCompleted: !note.isCompleted})
            })
            .then(() => {
                res.status(200)
                res.json({message: "Success"})
            })
            .catch(error => res.status(error.code).send(error))
    }

    return controller
}

module.exports = noteController
