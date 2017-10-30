const request = require('request-promise')

const baseUrl = 'https://graph.facebook.com/me?fields=id,email,first_name,last_name,picture'
const meUrlAuthorizationType = 'Bearer '

const facebookUtils = {}

facebookUtils.requestMyProfile = accessToken => {
    const headers = {Authorization: meUrlAuthorizationType + accessToken}
    const options = {
        url: baseUrl,
        headers: headers,
        json: true
    }

    return request.get(options)
}

module.exports = facebookUtils