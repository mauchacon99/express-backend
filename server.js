require('dotenv-safe').config({
    allowEmptyValues: true
})
const express = require('express')
const compression = require('compression')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const helmet = require('helmet')
const fs = require('fs')
const http = require('http')
const https = require('https')

const port = process.env.PORT || 8000

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

// app.set('port', port)
app.use(require('./routes'))

// Starting both http & https servers
if (process.env.NODE_ENV === 'production') {
    //Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/apienligthneering.bebettertest.net/privkey.pem', 'utf8')
    const certificate = fs.readFileSync('/etc/letsencrypt/live/apienligthneering.bebettertest.net/cert.pem', 'utf8')
    const ca = fs.readFileSync('/etc/letsencrypt/live/apienligthneering.bebettertest.net/chain.pem', 'utf8')
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    const httpsServer = https.createServer(credentials, app)

    httpsServer.listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`)
    });
}

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`)
});
// app.listen(app.get('port'))

module.exports = app
