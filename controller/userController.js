const passwordUtils = require('../utils/passwordUtils')
const errorUtils = require('../utils/errorUtils')
const tokenService = require('jwt-simple')
const appConstants = require('../config/constants')

const userController = (model) => {
    const controller = {}

    controller.getAll = (req, res, next) => {
        const token = req.query.token || req.headers[appConstants.headers.AUTH]

        if (!token) {
            throw errorUtils.unauthorized()
        }

        const tokenUser = tokenService.decode(token, process.env.TOKEN_SECRET)

        if (!tokenUser) {
            throw errorUtils.unauthorized()
        }


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

    controller.register = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then((user, error) => {
                if (error) {
                    throw error
                }

                if (user) { //ak ga ima jebo ga caca
                    res.sendStatus(401)
                    next()
                    throw 401
                } else {
                    const signUpUser = {
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: passwordUtils.cryptPassword(req.body.password)
                    }

                    model(signUpUser).save()

                    return { //we trim the rest of the data
                        name: signUpUser.name,
                        email: signUpUser.email
                    }
                }
            }).then(() => {
            res.status(200)
            res.json({message: 'Success'})
        }).catch((error) => {
            next(error)
        })
    }

    controller.login = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then((user) => {
                if (!user) {
                    throw errorUtils.unauthorized()
                }

                console.log(user)

                if (passwordUtils.compareHash(req.body.password, user.passwordHash)) {
                    const token = tokenService.encode({
                        id: user.id,
                        email: user.email
                    }, process.env.TOKEN_SECRET)

                    res.json({
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        token: token
                    })
                } else {
                    throw errorUtils.unauthorized()
                }
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