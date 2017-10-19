const userController = (model) => {
    const controller = {}

    controller.getAll = (req, res, next) => {
        model.find()
            .then((users) => {
                console.log(users)
                res.json(users)
            })
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    controller.register = (req, res, next) => {
        model.find({email: req.body.email})
            .then((user, error) => {
                if (error) {
                    throw error
                }

                if (user.length !== 0) { //ak ga ima jebo ga caca
                    res.sendStatus(401)
                    next()
                    throw 401
                } else {
                    return new model(req.body).save()
                }
            }).then(() => res.send(200))
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    controller.login = (req, res, next) => {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        model.findOne(credentials)
            .then((user) => {
                res.json(user)
            })
            .catch((error) => {
                res.send(500)
                next(error)
            })
    }

    controller.getById = (req, res, next) => {
        model.findById(req.params.id)
            .then((user) => {
                console.log(user)
                res.json(user)
            })
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    controller.delete = (req, res, next) => {
        model.remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    controller.deleteUser = (req, res, next) => {
        model.findById(req.params.id).remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    return controller
}

module.exports = userController