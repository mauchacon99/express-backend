require('dotenv-safe').config({
    allowEmptyValues: true
})
const express = require('express')
const compression = require('compression')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const helmet = require('helmet')
const i18n = require('i18n')

const port = process.env.PORT || 3000

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

require('./swagger-options')(app)// i18n
i18n.configure({
    locales: ['en', 'es'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    objectNotation: true
})
app.use(i18n.init)
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(passport.initialize())
// app.use(express.static('public'))
app.use(express.json())

app.set('port', port)
app.use(require('./routes'))
app.listen(app.get('port'))
console.log(`HTTP Server running on port ${port}`)

module.exports = app
