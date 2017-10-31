const cryptUtils = require("./cryptUtils")
const emailUtils = require("./emailVerificationUtils")

const userUtils = {}

userUtils.createUser = (user, model) => {
    const verificationCode = cryptUtils.generateVerificationCode().replace('/', '')

    const signUpUser = {
        name: user.name,
        email: user.email,
        passwordHash: cryptUtils.cryptPassword(user.password),
        verified: false,
        verificationCode: verificationCode
    }

    model(signUpUser).save()

    emailUtils.sendEmail(user.email, verificationCode)
}

module.exports = userUtils