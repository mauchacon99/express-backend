/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express')

const router = express.Router()
const fs = require('fs')

const routesPath = `${__dirname}/`

fs.readdirSync(routesPath).filter((file) => {
    // Take filename and remove last part (extension)
    const routeFile = file.split('.').slice(0, -1).join('.').toString()
    // Prevents loading of this file and auth file
    return routeFile !== 'index'
        ? router.use(`/${routeFile}`, require(`./${routeFile}`))
        : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
    res.render('index')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
    res.status(404).json({
        errors: {
            msg: 'URL_NOT_FOUND'
        }
    })
})

module.exports = router
