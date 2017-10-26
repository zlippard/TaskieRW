const nodemailer = require('nodemailer')

const emailVerificationUtils = {}

emailVerificationUtils.sendEmail = (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false,
        auth: {
            user: 'postmaster@sandbox4e02241b2223468fad226366b42a03a0.mailgun.org',
            pass: 'password'
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

    transporter.sendMail(mailOptions, error => console.log(error))
}
module.exports = emailVerificationUtils

