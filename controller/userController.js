const userController = (userModel) => {
    const controller = {}

    controller.getAll = (req, res, next) => {
        userModel.find()
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
        userModel.findById(req.params.id)
            .then((user) => {
                res.json({
                    id: user._id,
                    email: user.email,
                    name: user.name
                })
            })
            .catch((error) => {
                next(error)
            })
    }

    controller.delete = (req, res, next) => {
        userModel.remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                next(error)
            })
    }

    controller.deleteUser = (req, res, next) => {
        userModel.findById(req.params.id)
            .then(user => {
                if (!user) {
                    throw nekiKurac
                }

                return user.remove()
            })
            .then(() => res.sendStatus(200))//todo does the user exist or not
            .catch((error) => {
                next(error)
            })
    }

    return controller
}

module.exports = userController