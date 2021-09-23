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

require('./swagger-options')(app)
app.use(cors())
app.use(compression())
app.use(logger('dev'))
app.use(helmet())
app.use(passport.initialize())
app.use(express.json())

app.set('port', port)
app.use(require('./routes'))

console.log(`*** Run in http://localhost:${port} ***`)
app.listen(app.get('port'))

module.exports = app    
