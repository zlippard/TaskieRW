const request = require('request-promise')

const requestUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="
const signInUtils = {}

signInUtils.getUserProfile = userToken => {
    const userProfileUrl = `${requestUrl + userToken}`

    return request.get(userProfileUrl)
}

module.exports = signInUtils