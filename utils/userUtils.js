const cryptUtils = require("./cryptUtils")

const userUtils = {}

userUtils.createUser = (user, model) => {
    const verificationCode = cryptUtils.generateVerificationCode().replace('/', '')

    const signUpUser = {
        name: user.name,
        email: user.email,
        passwordHash: cryptUtils.cryptPassword(user.password),
        verified: true,
        verificationCode: verificationCode
    }

    model(signUpUser).save()
}

module.exports = userUtils