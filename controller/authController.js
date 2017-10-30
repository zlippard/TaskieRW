const cryptUtils = require('../utils/cryptUtils')
const errorUtils = require('../utils/errorUtils')
const tokenUtils = require('../utils/tokenUtils')
const userUtils = require('../utils/userUtils')

const authController = (model) => {
    const controller = {}

    controller.register = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then((user, error) => {
                if (error) {
                    next(error)
                }

                if (user) {
                    next(errorUtils.unauthorized())
                } else {
                    return userUtils.createUser(req.body, model)
                }
            })
            .then(() => {
                res.status(200)
                res.json({message: 'Success'})
            })
            .catch(error => next(error))
    }

    controller.login = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then(user => {
                if (!user || !user.verified) {
                    next(errorUtils.unauthorized())
                }

                if (cryptUtils.compareHash(req.body.password, user.passwordHash)) {
                    return tokenUtils.generateToken(user)
                } else {
                    next(errorUtils.unauthorized())
                }
            })
            .then(token => res.json({token: token}))
            .catch(error => next(error))
    }

    controller.verifyUser = (req, res, next) => {
        const verificationCode = req.params.verificationCode

        if (!verificationCode) {
            next(errorUtils.notVerified())
        }

        model.findOne({verificationCode: verificationCode})
            .then(user => {
                if (!user) {
                    next(errorUtils.unauthorized())
                }

                if (user.verified) {
                    next(errorUtils.alreadyVerified())
                }

                return user.update({
                    verified: true,
                    verificationCode: null //we remove it
                })
            })
            .then(() => {
                res.status(200)
                res.json({message: 'Success'})
            })
            .catch(error => next(error))
    }

    return controller
}

module.exports = authController