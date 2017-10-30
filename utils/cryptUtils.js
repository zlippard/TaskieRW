const constants = require('../config')
const bcrypt = require('bcrypt')
const cryptSalt = 10

const cryptUtils = {}

cryptUtils.generateVerificationCode = () => {
    return bcrypt.hashSync(constants.VERIFICATION_SECRET, cryptSalt)
}

cryptUtils.cryptPassword = (password) => {
    return bcrypt.hashSync(password, cryptSalt)
}

cryptUtils.compareHash = (value, hash) => {
    return bcrypt.compareSync(value, hash)
}

module.exports = cryptUtils