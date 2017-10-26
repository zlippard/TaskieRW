const passwordUtils = require('../utils/passwordUtils')
const errorUtils = require('../utils/errorUtils')
const tokenService = require('jwt-simple')

const authController = (model) => {
    const controller = {}

    controller.register = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then((user, error) => {
                if (error) { //todo sve proslijedi na error handler
                    throw error
                }

                if (user) { //ak ga ima jebo ga caca
                    res.send(errorUtils.unauthorized())
                    throw 401
                } else {
                    const signUpUser = {
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: passwordUtils.cryptPassword(req.body.password)
                    }

                    model(signUpUser).save()

                    res.status(200)
                    res.json({message: 'Success'})
                }
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

                if (passwordUtils.compareHash(req.body.password, user.passwordHash)) {
                    const token = tokenService.encode({
                        id: user.id,
                        email: user.email
                    }, process.env.TOKEN_SECRET)

                    res.json({
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

    return controller
}

module.exports = authController