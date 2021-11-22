const chai = require('chai')
const chaiHttp = require('chai-http')
const { invitation } = require('../models')
const server = require('../server')
const should = chai.should()
const coachLoginDetails = {
    email: 'coach@coach.com',
    password: '123456'
}
const vendorLoginDetails = {
    email: 'vendor@vendor.com',
    password: '123456'
}
let coachToken = ''
let vendorToken = ''
const createdID = []
let coachHashVerification = ''
let vendorHashVerification = ''

const payload = {
    to: 3,
}

chai.use(chaiHttp)

describe('*********** INVITATIONS ***********', () => {
    describe('/POST login coach', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(coachLoginDetails)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    coachToken = res.body.token
                    coachHashVerification = res.body.user.verification;
                    done()
                })
        })
    })

    describe('/POST login vendor', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(vendorLoginDetails)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    vendorToken = res.body.token
                    vendorHashVerification = res.body.user.verification;
                    done()
                })
        })
    })

    describe('/GET invitations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/invitations')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all invitations', (done) => {
            chai
                .request(server)
                .get('/invitations')
                .set('Authorization', `Bearer ${coachToken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys(
                        'from',
                        'to',
                    )
                    done()
                })
        })
    })

    describe('/POST invitations from coach', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST invitations if data its empty', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${coachToken}`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })

        it('it should POST a invitations', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${coachToken}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'from',
                        'to',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.from.should.be.a('number')
                    res.body.to.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:hash invitations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const hash = coachHashVerification
            chai
                .request(server)
                .get(`/invitations/${hash}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a invitation if hash is not exist', (done) => {
            chai
                .request(server)
                .get('/invitations/xyz')
                .set('Authorization', `Bearer ${coachToken}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a invitation by the given id', (done) => {
            const hash = coachHashVerification
            chai
                .request(server)
                .get(`/invitations/${hash}`)
                .set('Authorization', `Bearer ${vendorToken}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'vendor',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.vendor.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id invitations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/invitations/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a invitations given the id', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${coachToken}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/invitations/${res.body.id}`)
                        .set('Authorization', `Bearer ${coachToken}`)
                        .end((error, result) => {
                            result.should.have.status(200)
                            done()
                        })
                })
        })
    })

    after(() => {
        createdID.forEach((id) => {
            invitation.destroy({ where: { id } }).then()
        })
    })
})
