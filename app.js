const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

const port = process.env.PORT || 3000;

app.set('port', port)
app.use(require('./routes'))

app.listen(app.get('port'))

module.exports = app
