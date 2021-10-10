const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const i18n = require('i18n')

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
exports.sendResetPasswordEmailMessage = (locale = 'es', user = {}) => {
    i18n.setLocale(locale)
    const subject = i18n.__('forgotPassword.SUBJECT')
    const htmlMessage = i18n.__(
        'forgotPassword.MESSAGE',
        user.email,
        process.env.FRONTEND_URL,
        user.verification
    )
    prepareToSendEmail(user, subject, htmlMessage)
}

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
exports.sendRegistrationEmailMessage = (locale = '', user = {}) => {
    i18n.setLocale(locale)
    const subject = i18n.__('registration.SUBJECT')
    const htmlMessage = i18n.__(
        'registration.MESSAGE',
        `${user.name} ${user.lastname}`,
        process.env.FRONTEND_URL,
        user.verification
    )
    prepareToSendEmail(user, subject, htmlMessage)
}

/**
 * Sends email
 * @param {Object} data - data
 * @param {function} callback - callback
 */
const sendEmail = async (data = {}, callback) => {
    let auth = {}

    if (process.env.NODE_ENV === 'production') {
        const options = {
            auth: {
                api_user: process.env.SENDGRID_USER,
                api_key: process.env.SENDGRID_PASSWORD
            }
        }
        auth = sgTransport(options)
    } else {
        auth = {
            host: process.env.EMAIL_SMTP,
            port: process.env.EMAIL_SMTP_PORT,
            auth: {
                user: process.env.EMAIL_SMTP_USER,
                pass: process.env.EMAIL_SMTP_PASS
            }
        }
    }
    const transporter = nodemailer.createTransport(auth)
    const mailOptions = {
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: `${data.user.name} <${data.user.email}>`,
        subject: data.subject,
        html: data.htmlMessage,
        bcc: process.env.EMAIL_BBC
    }
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log('Error', err)
            return callback(false)
        }
        return callback(true)
    })
}

/**
 * Prepares to send email
 * @param {Object} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '', htmlMessage = '') => {
    user = {
        name: `${user.name} ${user.lastname}`,
        email: user.email,
        verification: user.verification
    }
    const data = {
        user,
        subject,
        htmlMessage
    }
    if (process.env.NODE_ENV === 'production') {
        sendEmail(data, (messageSent) => messageSent
            ? console.log(`Email SENT to: ${user.email}`)
            : console.log(`Email FAILED to: ${user.email}`)).then()
    } else {
        sendEmail(data, (messageSent) => messageSent
            ? console.log(`(DEV) Email SENT to: ${user.email}`)
            : console.log(`(DEV) Email FAILED to: ${user.email}`)).then()
    }
}
