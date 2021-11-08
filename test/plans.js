const chai = require('chai')
const chaiHttp = require('chai-http')
const { plan } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=name&relations=programPL.name&filter=Some&sort=createdAt&page=1&limit=10&order=DESC'

const payload = {
    id: 1,
    name: 'Some interesting plan name',
    description: 'Some description of plan',
    users: 5,
    roleId: 2,
    userId: 2,
    status: true,
    programId: 1,
    storageId: 1,
    price: 20.99,
}

chai.use(chaiHttp)

describe('*********** PLANS ***********', () => {
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

    describe('/GET plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/plans')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all plans', (done) => {
            chai
                .request(server)
                .get('/plans')
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
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'description',
                        'programId',
                        'status',
                        'storageId',
                        'price',
                        'userPL',
                        'subscribers',
                        'programPL',
                        'storagePL',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].users.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].storageId.should.be.a('number')
                    res.body.docs[0].price.should.be.a('number')
                    res.body.docs[0].subscribers.should.be.a('number')
                    res.body.docs[0].userPL.should.be.a('object')
                    res.body.docs[0].programPL.should.be.a('object')
                    res.body.docs[0].storagePL.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the plans with filters', (done) => {
            chai
                .request(server)
                .get(`/plans?${queryParams}`)
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
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'programId',
                        'status',
                        'storageId',
                        'description',
                        'price',
                        'userPL',
                        'subscribers',
                        'programPL',
                        'storagePL',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].users.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].storageId.should.be.a('number')
                    res.body.docs[0].price.should.be.a('number')
                    res.body.docs[0].subscribers.should.be.a('number')
                    res.body.docs[0].userPL.should.be.a('object')
                    res.body.docs[0].programPL.should.be.a('object')
                    res.body.docs[0].storagePL.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })
    })

    describe('/GET all plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/plans/all')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all plans', (done) => {
            chai
                .request(server)
                .get('/plans/all')
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
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'programId',
                        'status',
                        'storageId',
                        'price',
                        'description',
                        'userPL',
                        'subscribers',
                        'programPL',
                        'storagePL',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].users.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].storageId.should.be.a('number')
                    res.body.docs[0].price.should.be.a('number')
                    res.body.docs[0].subscribers.should.be.a('number')
                    res.body.docs[0].userPL.should.be.a('object')
                    res.body.docs[0].programPL.should.be.a('object')
                    res.body.docs[0].storagePL.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the plans with filters', (done) => {
            chai
                .request(server)
                .get(`/plans/all?${queryParams}`)
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
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'programId',
                        'status',
                        'description',
                        'storageId',
                        'price',
                        'userPL',
                        'subscribers',
                        'programPL',
                        'storagePL',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].users.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].programId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].storageId.should.be.a('number')
                    res.body.docs[0].price.should.be.a('number')
                    res.body.docs[0].subscribers.should.be.a('number')
                    res.body.docs[0].userPL.should.be.a('object')
                    res.body.docs[0].programPL.should.be.a('object')
                    res.body.docs[0].storagePL.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })
    })

    describe('/POST plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/plans')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST plans if data its empty', (done) => {
            chai
                .request(server)
                .post('/plans')
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
        it('it should POST a plans', (done) => {
            chai
                .request(server)
                .post('/plans')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'name',
                        'users',
                        'roleId',
                        'description',
                        'userId',
                        'programId',
                        'status',
                        'storageId',
                        'price',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.users.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.storageId.should.be.a('number')
                    res.body.price.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/plans/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a plan if id is not exist', (done) => {
            chai
                .request(server)
                .get('/plans/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a plan by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/plans/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'programId',
                        'status',
                        'storageId',
                        'price',
                        'userPL',
                        'description',
                        'planS',
                        'programPL',
                        'storagePL',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.users.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.storageId.should.be.a('number')
                    res.body.price.should.be.a('number')
                    res.body.planS.should.be.a('array')
                    res.body.userPL.should.be.a('object')
                    res.body.programPL.should.be.a('object')
                    res.body.storagePL.should.be.a('object')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/plans/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH plan if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/plans/${id}`)
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
        it('it should UPDATE a plans given the id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/plans/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'name',
                        'users',
                        'roleId',
                        'userId',
                        'programId',
                        'description',
                        'status',
                        'storageId',
                        'price',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.users.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.programId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.storageId.should.be.a('number')
                    res.body.price.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id plans', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/plans/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a plans given the id', (done) => {
            chai
                .request(server)
                .post('/plans')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/plans/${res.body.id}`)
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
            plan.destroy({ where: { id } }).then()
        })
    })
})
