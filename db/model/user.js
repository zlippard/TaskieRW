const UserModel = (database) => database.model('User', {
    name: String,
    email: String,
    password: String
})

module.exports = UserModel