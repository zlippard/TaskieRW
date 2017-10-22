const tokenUtils = require('../utils/tokenUtils')

const userController = (model) => {
    const controller = {}

    controller.getAll = (req, res, next) => {
        model.find()
            .then((users) => {
                res.json(users.map((user) => {
                    return {
                        email: user.email,
                        name: user.name
                    }
                }))
            })
            .catch((error) => {
                next(error)
            })
    }

    controller.getById = (req, res, next) => {
        model.findById(req.params.id)
            .then((user) => {
                res.json(user)
            })
            .catch((error) => {
                next(error)
            })
    }

    controller.delete = (req, res, next) => {
        model.remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                next(error)
            })
    }

    controller.deleteUser = (req, res, next) => {
        model.findById(req.params.id).remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                next(error)
            })
    }

    return controller
}

module.exports = userController