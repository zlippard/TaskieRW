const errorUtils = require('../utils/errorUtils')
const googleUtils = require('../utils/googleSignInUtils')
const facebookUtils = require('../utils/facebookLoginUtils')
const tokenUtils = require('../utils/tokenUtils')

const socialController = (model) => {
    const controller = {}

    controller.googleLogin = (req, res, next) => {
        googleUtils.getUserProfile(req.query.userToken)
            .then(response => {
                if (!response) {
                    next(errorUtils.unauthorized())
                }

                return model.findOne({email: user.email})
            })
            .then(user => {
                if (!user) {
                    next(errorUtils.unauthorized())
                }

                return tokenUtils.generateToken(user)
            })
            .then(token => res.json({token: token}))
            .catch(error => next(error))
    }

    controller.facebookLogin = (req, res, next) => {
        const facebookToken = req.query.facebookToken

        if (!facebookToken) {
            next(errorUtils.unauthorized())
        }

        facebookUtils.requestMyProfile(facebookToken)
            .then(response => {
                if (!response) {
                    next(errorUtils.unauthorized())
                }

                return model.findOne({email: response.email})
            })
            .then(user => {
                if (!user) {
                    next(errorUtils.unauthorized())
                }

                return tokenUtils.generateToken(user)
            })
            .then(token => res.json({token: token}))
            .catch(error => next(error))
    }

    return controller
}

module.exports = socialController