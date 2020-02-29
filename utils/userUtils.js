const cryptUtils = require("./cryptUtils")

const userUtils = {}

userUtils.createUser = (user, model) => {
    const signUpUser = {
        name: user.name,
        email: user.email,
        passwordHash: cryptUtils.cryptPassword(user.password)
    }

    model(signUpUser).save()
}

module.exports = userUtils