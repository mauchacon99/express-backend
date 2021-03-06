const chai = require('chai')
const chaiHttp = require('chai-http')
const { Op } = require("sequelize")
const { invitation, user } = require('../models')
const server = require('../server')
const should = chai.should()
const coachALoginDetails = {
    email: 'coach@coach.com',
    password: '123456'
}
const coachBLoginDetails = {
    email: 'coach1@coach.com',
    password: '123456'
}
const vendorLoginDetails = {
    email: 'vendor@vendor.com',
    password: '123456'
}
let coachAToken = ''
let coachBToken = ''
let vendorToken = ''
const createdID = []
let coachAHashVerification = ''
let coachBHashVerification = ''
let vendorHashVerification = ''

const payload1 = { to: 3 }
const payload2 = { to: 6 }
const payload3 = { to: 7 }

chai.use(chaiHttp)

describe('*********** INVITATIONS ***********', () => {

    before(async () => {
        await user.update(
            { vendor: null },
            { where: { id: { [Op.in]: [6, 7] } } }
        )
    })

    describe('/POST login coach A', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(coachALoginDetails)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    coachAToken = res.body.token
                    coachAHashVerification = res.body.user.verification;
                    done()
                })
        })
    })

    describe('/POST login coach B', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(coachBLoginDetails)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('permissions', 'token', 'user')
                    res.body.permissions.should.be.a('array')
                    res.body.token.should.be.a('string')
                    res.body.user.should.be.a('object')
                    coachBToken = res.body.token
                    coachBHashVerification = res.body.user.verification;
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
                .set('Authorization', `Bearer ${coachAToken}`)
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

    describe('/POST invitations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .send(payload1)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST invitations if data its empty', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${coachAToken}`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })

        it('it should POST a invitations from coach to vendor', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${coachAToken}`)
                .send(payload1)
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

        it('it should POST a invitations from vendor to coach', (done) => {
            chai
                .request(server)
                .post('/invitations')
                .set('Authorization', `Bearer ${vendorToken}`)
                .send(payload2)
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
            chai
                .request(server)
                .get(`/invitations/${coachAHashVerification}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a invitation if hash is not exist', (done) => {
            chai
                .request(server)
                .get('/invitations/xyz')
                .set('Authorization', `Bearer ${coachAToken}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET accept invitation if vendor by the given hash', (done) => {
            chai
                .request(server)
                .get(`/invitations/${coachAHashVerification}`)
                .set('Authorization', `Bearer ${vendorToken}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('msg')
                    done()
                })
        })
        it('it should GET accept invitation if coach by the given hash', (done) => {
            chai
                .request(server)
                .get(`/invitations/${vendorHashVerification}`)
                .set('Authorization', `Bearer ${coachBToken}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('msg')
                    done()
                })
        })
    })

    it('it should NOT POST invitations if receiver already has a vendor', (done) => {
        chai
            .request(server)
            .post('/invitations')
            .set('Authorization', `Bearer ${vendorToken}`)
            .send(payload3)
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })

    it('it should NOT POST invitations if sender has a vendor', (done) => {
        chai
            .request(server)
            .post('/invitations')
            .set('Authorization', `Bearer ${coachAToken}`)
            .send(payload1)
            .end((err, res) => {
                res.should.have.status(401)
                done()
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
                .set('Authorization', `Bearer ${vendorToken}`)
                .send(payload3)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/invitations/${res.body.id}`)
                        .set('Authorization', `Bearer ${vendorToken}`)
                        .end((error, result) => {
                            result.should.have.status(200)
                            done()
                        })
                })
        })
    })

    after(async () => {
        createdID.forEach((id) => {
            invitation.destroy({ where: { id } }).then()
        })

        user.update(
            { vendor: 3 },
            { where: { id: { [Op.in]: [6, 7] } } }
        ).then()
        user.update(
            { vendor: null },
            { where: { id: 2 } }
        ).then()
    })
})
