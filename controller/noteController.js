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
            next(errorUtils.unauthorized())
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
                        isFavorite: note.isFavorite ? note.isFavorite : false,
                        taskPriority: note.taskPriority ? note.taskPriority : 1,
                        isCompleted: note.isCompleted ? note.isCompleted : false,
                        dueDate: note.dueDate ? note.dueDate : ""
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

    controller.getNoteById = (req, res, next) => {
        const id = req.params.id

        if (!id) {
            next(errorUtils.notFound())
        }

        noteModel.findById(id)
            .then(note => {
                if (!note) {
                    next(!errorUtils.notFound())
                }

                return {
                    id: note._id,
                    title: note.title,
                    content: note.content,
                    isFavorite: note.isFavorite ? note.isFavorite : false,
                    taskPriority: note.taskPriority ? note.taskPriority : 1,
                    isCompleted: note.isCompleted ? note.isCompleted : false,
                    dueDate: note.dueDate ? note.dueDate : ""
                }
            })
            .then(note => {
                res.status(200)
                res.json(note)
            })
            .catch(error => next(error))
    }

    controller.getFavoriteNotes = (req, res, next) => {
        const userId = req.userId

        if (!userId) {
            next(errorUtils.unauthorized())
        }

        noteModel.find({userId: userId, isFavorite: true})
            .then(notes => {
                const trimmedNotes = notes.map((note) => {
                    return {
                        id: note._id,
                        title: note.title,
                        content: note.content,
                        isFavorite: note.isFavorite ? note.isFavorite : false,
                        taskPriority: note.taskPriority ? note.taskPriority : 1,
                        isCompleted: note.isCompleted ? note.isCompleted : false,
                        dueDate: note.dueDate ? note.dueDate : ""
                    }
                })

                return {
                    notes: trimmedNotes
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

        if (!req.userId) {
            next(errorUtils.unauthorized())
        }

        const newNote = {
            userId: req.userId,
            title: note.title,
            content: note.content,
            isFavorite: false,
            isCompleted: false,
            taskPriority: note.taskPriority,
            dueDate: note.dueDate
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
                    isFavorite: false,
                    isCompleted: false,
                    taskPriority: savedNote.taskPriority,
                    dueDate: savedNote.dueDate
                })
            })
            .catch(error => next(error))
    }

    controller.deleteNoteById = (req, res, next) => {
        noteModel.findById(req.query.id)
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
        noteModel.findById(req.query.id)
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

    controller.setNoteCompleted = (req, res, next) => {
        noteModel.findById(req.query.id)
            .then(note => {
                if (!note) {
                    next(errorUtils.notFound())
                }

                return note.update({isCompleted: !note.isCompleted})
            })
            .then(() => {
                res.status(200)
                res.json({message: "Success"})
            })
            .catch(error => next(error))
    }

    controller.editNote = (req, res, next) => {
        noteModel.findById(req.body.id)

            .then(note => {
                if (!note) {
                    next(errorUtils.notFound())
                }

                const newNote = req.body

                return note.update({
                    title: newNote.title ? newNote.title : note.title,
                    content: newNote.content ? newNote.content : note.content,
                    taskPriority: newNote.taskPriority ? newNote.taskPriority : note.taskPriority ? note.taskPriority : 1,
                    dueDate: newNote.dueDate ? newNote.dueDate : note.dueDate ? note.dueDate : ""
                })
            })
            .then(() => {
                res.status(200)
                res.json({message: "Success"})
            })
            .catch(error => next(error))
    }

    controller.getCompletedNotes = (req, res, next) => {
        const userId = req.userId

        if (!userId) {
            next(errorUtils.unauthorized())
        }

        noteModel.find({userId: userId, isCompleted: true})
            .then(notes => {
                const trimmedNotes = notes.map((note) => {
                    return {
                        id: note._id,
                        title: note.title,
                        content: note.content,
                        isFavorite: note.isFavorite ? note.isFavorite : false,
                        taskPriority: note.taskPriority ? note.taskPriority : 1,
                        isCompleted: note.isCompleted ? note.isCompleted : false,
                        dueDate: note.dueDate ? note.dueDate : ""
                    }
                })

                return {
                    notes: trimmedNotes
                }
            })
            .then(trimmedNotes => {
                res.status(200)
                res.json(trimmedNotes)
            })
            .catch(error => next(error))
    }

    return controller
}

module.exports = noteController
