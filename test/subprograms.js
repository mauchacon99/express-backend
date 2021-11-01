const chai = require('chai')
const chaiHttp = require('chai-http')
const { subprogram } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = ''

const payload = {
    programId: 1,
    description: 'Sunt amet laborum pariatur eiusmod duis ipsum esse.',
    position: 1,
    name: 'Some interesting subprogram name',
}

chai.use(chaiHttp)

describe('*********** SUBPROGRAMS ***********', () => {
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

    describe('/GET subprograms', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/subprograms')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all subprograms', (done) => {
            chai
                .request(server)
                .get('/subprograms')
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
                        'programId',
                        'name',
                        'description',
                        'programSP',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].programSP.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the subprograms with filters', (done) => {
            chai
                .request(server)
                .get(`/subprograms?${queryParams}`)
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
                        'programId',
                        'name',
                        'description',
                        'programSP',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].programSP.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })
    })

    describe('/POST subprograms', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/subprograms')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST subprograms if data its empty', (done) => {
            chai
                .request(server)
                .post('/subprograms')
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
        it('it should POST a subprograms', (done) => {
            chai
                .request(server)
                .post('/subprograms')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'programId',
                        'name',
                        'description',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id subprograms', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/subprograms/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a subprogram if id is not exist', (done) => {
            chai
                .request(server)
                .get('/subprograms/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a subprogram by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/subprograms/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'programId',
                        'name',
                        'description',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id subprograms', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subprograms/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH subprogram if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subprograms/${id}`)
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
        it('it should UPDATE a subprograms given the id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/subprograms/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'programId',
                        'name',
                        'description',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id subprograms', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/subprograms/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a subprograms given the id', (done) => {
            chai
                .request(server)
                .post('/subprograms')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/subprograms/${res.body.id}`)
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
            subprogram.destroy({ where: { id } }).then()
        })
    })
})
