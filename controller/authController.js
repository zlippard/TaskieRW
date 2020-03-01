const cryptUtils = require('../utils/cryptUtils')
const errorUtils = require('../utils/errorUtils')
const tokenUtils = require('../utils/tokenUtils')
const userUtils = require('../utils/userUtils')

const authController = (model) => {
    const controller = {}

    controller.register = (req, res, next) => {
        console.log(req.body)
        model.findOne({email: req.body.email})
            .then((user, error) => {
                if (error) {
                    throw error
                }

                if (!user) {
                    return userUtils.createUser(req.body, model)
                } else {
                    throw errorUtils.unauthorized()
                }
            })
            .then(() => {
                res.status(200)
                res.send({message: "Success"})
            })
            .catch(error => res.status(error.statusCode).send(error))
    }

    controller.login = (req, res, next) => {
        model.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    throw errorUtils.unauthorized()
                }

                if (cryptUtils.compareHash(req.body.password, user.passwordHash)) {
                    return tokenUtils.generateToken(user)
                } else {
                    throw errorUtils.unauthorized()
                }
            })
            .then(token => res.json({token: token}))
            .catch(error => res.status(error.statusCode).send(error))
    }

    return controller
}

module.exports = authController