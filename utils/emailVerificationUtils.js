const nodemailer = require('nodemailer')
const appConstants = require('../config')

const emailVerificationUtils = {}

emailVerificationUtils.sendEmail = (email, verificationCode) => {
    const transporter = nodemailer.createTransport({ //todo znas sta ti je raditi
        host: appConstants.EMAIL_PROVIDER,
        port: 587,
        secure: false,
        auth: {
            user: appConstants.EMAIL_PROVIDER_USERNAME,
            pass: appConstants.EMAIL_PROVIDER_PASSWORD
        }
    })

    const link = `http://localhost:3000/api/login/${verificationCode}`

    const mailOptions = {
        from: '<fbabic96@gmail.com>',
        to: email,
        subject: 'Account verification',
        text: 'Click on the link to verify your account!',
        html: `<b><a href=${link}>Click here to verify</a></b>`
    };

    transporter.sendMail(mailOptions, error => {
        if (error) {
            console.log(error)
        }
    })
}
module.exports = emailVerificationUtils

