const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { user } = require('../models')
const server = require('../server')
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
const userNotExist = {
    email: 'notexist@notexist.com',
    password: '123456'
}
const wrongPassword = {
    email: 'admin@admin.com',
    password: '784365'
}
const userSend = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.words(8),
    roleId: 2
}
let token = ''
let verification = ''
const createdID = []
const should = chai.should()

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
    describe('/GET /404url', () => {
        it('it should GET 404 url', (done) => {
            chai
                .request(server)
                .get('/404url')
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.an('object')
                    done()
                })
        })
    })

    describe('/POST login', () => {
        it('it should GET (token, user, permissions)', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(loginDetails)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    token = res.body.token
                    done()
                })
        })
        it('it should NOT POST user does not exist', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(userNotExist)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST wrong password', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(wrongPassword)
                .end((err, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST login if data its empty', (done) => {
            chai
                .request(server)
                .post('/login')
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST register', () => {
        it('it should POST register', (done) => {
            chai
                .request(server)
                .post('/register')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('token', 'user', 'permissions')
                    verification = res.body.user.verification
                    createdID.push(res.body.user.email)
                    done()
                })
        })
        it('it should NOT POST a register if email already exists', (done) => {
            userSend.email = 'admin@admin.com'
            chai
                .request(server)
                .post('/register')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST register if data its empty', (done) => {
            chai
                .request(server)
                .post('/register')
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
    })

    describe('/GET token', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/token')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET a fresh token', (done) => {
            chai
                .request(server)
                .get('/token')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    done()
                })
        })
    })

    describe('/POST verify', () => {
        it('it should POST verify', (done) => {
            chai
                .request(server)
                .post('/verify')
                .send({
                    id: verification
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('email', 'verified')
                    res.body.verified.should.equal(true)
                    done()
                })
        })
        it('it should NOT POST verify', (done) => {
            chai
                .request(server)
                .post('/verify')
                .send({
                    id: 'jkadsbvybeiudhasdnciulwcheiwn'
                })
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.an('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST verify if data its empty', (done) => {
            chai
                .request(server)
                .post('/verify')
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST forgot', () => {
        it('it should POST forgot', (done) => {
            chai
                .request(server)
                .post('/forgot')
                .send({
                    email: createdID[0]
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    // res.body.forgotPassword.should.equal(true)
                    done()
                })
        })
        it('it should NOT POST forgot', (done) => {
            chai
                .request(server)
                .post('/forgot')
                .send({
                    email: 'user@dontexist.com'
                })
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.an('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST forgot if data its empty', (done) => {
            chai
                .request(server)
                .post('/forgot')
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST reset', () => {
        it('it should POST reset', (done) => {
            chai
                .request(server)
                .post('/reset')
                .send({
                    id: verification,
                    password: '12345'
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
        it('it should NOT POST reset', (done) => {
            chai
                .request(server)
                .post('/reset')
                .send({
                    id: verification+'dfdfdf',
                    password: '12345'
                })
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.an('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST reset if data its empty', (done) => {
            chai
                .request(server)
                .post('/reset')
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
    })

    after(() => {
        createdID.forEach((email) => {
            user.destroy({ where: { email } }).then()
        })
    })
})
