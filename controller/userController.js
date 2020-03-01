const errorUtils = require('../utils/errorUtils')

const userController = (userModel) => {
    const controller = {}

    controller.getProfile = (req, res, next) => {
        userModel.findById(req.userId)
            .then(user => res.json({
                id: user._id,
                email: user.email,
                name: user.name
            }))
            .catch(error => res.status(error.statusCode).send(error))
    }

    return controller
}

module.exports = userController