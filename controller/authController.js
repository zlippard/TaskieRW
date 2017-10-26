const cryptUtils = require('../utils/cryptUtils')
const errorUtils = require('../utils/errorUtils')
const tokenService = require('jwt-simple')
const emailUtils = require('../utils/emailVerificationUtils')

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
                    const verificationCode = cryptUtils.generateVerificationCode()

                    const signUpUser = {
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: cryptUtils.cryptPassword(req.body.password),
                        verified: false,
                        verificationCode: verificationCode
                    }

                    model(signUpUser).save()

                    emailUtils.sendEmail(req.body.email, verificationCode)

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
                if (!user || !user.verified) {
                    throw errorUtils.unauthorized()
                }

                if (cryptUtils.compareHash(req.body.password, user.passwordHash)) {
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

    controller.verifyUser = (req, res, next) => {
        const verificationCode = req.params.verificationCode

        if (!verificationCode) {
            throw 'Verification code not sent' //todo zna se
        }

        model.findOne({verificationCode: verificationCode})
            .then(user => {
                if (!user) {
                    next(errorUtils.unauthorized()) //todo isto se zna
                }

                if (user.verified) {
                    throw 'Already verified!'
                }

                return user.update({
                    verified: true,
                    verificationCode: null //we remove it
                })
            })
            .then(() => {
                res.status(200)
                res.json({
                    message: 'Success'
                })
            })
            .catch(error => {
                next(error)
            })
    }

    return controller
}

module.exports = authController