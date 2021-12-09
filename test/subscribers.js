const chai = require('chai')
const chaiHttp = require('chai-http')
const { subscriber } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'personal@personal.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = ''

const payload = {
    userId: 5,
    planId: 3,
    subprogramId: 1,
}

chai.use(chaiHttp)

describe('*********** SUBSCRIBERS ***********', () => {
    describe('/POST login', () => {
        it('it should GET token', (done) => {
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
    })

    describe('/GET subscribers', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/subscribers')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all subscribers', (done) => {
            chai
                .request(server)
                .get('/subscribers')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].should.include.keys(
                        'id',
                        'userId',
                        'planId',
                        'subprogramId',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].planId.should.be.a('number')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the subscribers with filters', (done) => {
            chai
                .request(server)
                .get(`/subscribers?${queryParams}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].should.include.keys(
                        'id',
                        'userId',
                        'planId',
                        'subprogramId',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].planId.should.be.a('number')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })
    })

    describe('/POST subscribers', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/subscribers')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST subscribers if data its empty', (done) => {
            chai
                .request(server)
                .post('/subscribers')
                .set('Authorization', `Bearer ${token}`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
        it('it should POST a subscribers', (done) => {
            chai
                .request(server)
                .post('/subscribers')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'planId',
                        'subprogramId',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.planId.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id subscribers', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get(`/subscribers/5`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        // it('it should NOT GET a subscriber if id is not exist', (done) => {
        //     chai
        //         .request(server)
        //         .get('/subscribers/100')
        //         .set('Authorization', `Bearer ${token}`)
        //         .end((err, res) => {
        //             res.should.have.status(404)
        //             res.body.should.be.a('object')
        //             res.body.should.have.property('errors')
        //             res.body.errors.msg.should.be.a('string')
        //             done()
        //         })
        // })
        it('it should GET a subscriber by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/subscribers/5`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body[0].should.include.keys(
                        'id',
                        'userId',
                        'planId',
                        'subprogramId',
                        'planS',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body[0].id.should.be.a('number')
                    res.body[0].userId.should.be.a('number')
                    res.body[0].planId.should.be.a('number')
                    res.body[0].planS.should.be.a('object')
                    res.body[0].createdAt.should.be.a('string')
                    res.body[0].updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id subscribers', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subscribers/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH subscriber if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subscribers/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('array')
                    done()
                })
        })
        it('it should UPDATE a subscribers given the id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subscribers/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'planId',
                        'subprogramId',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.planId.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id subscribers', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/subscribers/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a subscribers given the id', (done) => {
            chai
                .request(server)
                .post('/subscribers')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/subscribers/${res.body.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((error, result) => {
                            result.should.have.status(200)
                            done()
                        })
                })
        })
    })

    after(() => {
        createdID.forEach((id) => {
            subscriber.destroy({ where: { id } }).then()
        })
    })
})
