const chai = require('chai')
const chaiHttp = require('chai-http')
const { permissions } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=roleId&filter=1'

const payload = {
    status: true,
    methods: ["get", "post", "delete", "patch"],
    roleId: 1,
    moduleId: 1,
    visible: true,
}

chai.use(chaiHttp)

describe('*********** PERMISSIONS ***********', () => {
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

    describe('/GET permissions', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/permissions')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all permissions', (done) => {
            chai
                .request(server)
                .get('/permissions')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].moduleId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].methods.should.be.a('array')
                    res.body.docs[0].module.should.be.a('object')
                    res.body.docs[0].roleP.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    res.body.docs[0].visible.should.be.a('boolean')
                    done()
                })
        })

        it('it should GET the permissions with filters', (done) => {
            chai
                .request(server)
                .get(`/permissions?${queryParams}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].moduleId.should.be.a('number')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].methods.should.be.a('array')
                    res.body.docs[0].module.should.be.a('object')
                    res.body.docs[0].roleP.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    res.body.docs[0].visible.should.be.a('boolean')
|                   done()
                })
        })
    })

    describe('/POST permissions', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/permissions')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST permission if data its empty', (done) => {
            chai
                .request(server)
                .post('/permissions')
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
        it('it should POST a permission', (done) => {
            chai
                .request(server)
                .post('/permissions')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.moduleId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    res.body.visible.should.be.a('boolean')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id permission', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/permissions/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a permission if id is not exist', (done) => {
            chai
                .request(server)
                .get('/permissions/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a permission by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/permissions/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.moduleId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.module.should.be.a('object')
                    res.body.roleP.should.be.a('object')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    res.body.visible.should.be.a('boolean')
                    done()
                })
        })
    })

    describe('/PATCH/:id permissions', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/permissions/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH permissions if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/permissions/${id}`)
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
        it('it should UPDATE a permissions given the id', (done) => {
            const id = createdID[0]
            payload.status = false
            chai
                .request(server)
                .patch(`/permissions/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.moduleId.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    res.body.visible.should.be.a('boolean')
                    done()
                })
        })
    })

    describe('/DELETE/:id permissions', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/permissions/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a permissions given the id', (done) => {
            chai
                .request(server)
                .post('/permissions')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/permissions/${res.body.id}`)
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
            permissions.destroy({ where: { id } }).then()
        })
    })
})
