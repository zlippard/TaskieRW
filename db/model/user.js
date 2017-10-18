const UserModel = (database) => database.model('User', {
    name: String,
    lastName: String,
    weight: Number,
    height: Number
})

module.exports = UserModel