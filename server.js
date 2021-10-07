require('dotenv-safe').config({
    allowEmptyValues: true
})
const express = require('express')
const compression = require('compression')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const helmet = require('helmet')

const port = process.env.PORT || 3000

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

require('./swagger-options')(app)
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(passport.initialize())
app.use(express.json())

app.set('port', port)
app.use(require('./routes'))
app.listen(app.get('port'))
console.log(`HTTP Server running on port ${port}`)

module.exports = app
