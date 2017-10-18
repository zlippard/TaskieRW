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

    controller.saveUser = (req, res, next) => {
        const user = new model(req.body)

        user.save()
            .then(() => res.sendStatus(200))
            .catch(error => {
                console.log(error)
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
        model.find().remove()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }

    return controller
}

module.exports = userController