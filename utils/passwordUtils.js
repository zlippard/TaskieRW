const bcrypt = require('bcrypt')

const cryptSalt = 10

const passwordUtils = {}

passwordUtils.cryptPassword = (password) => {
    return bcrypt.hashSync(password, cryptSalt)
}

passwordUtils.compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = passwordUtils