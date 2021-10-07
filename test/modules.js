const faker = require("faker")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require('../server')
const { modules } = require('../models')
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=route&filter=phones'

const payload = {
    status: true,
    methods: ["get", "post", "delete", "patch"],
    icon: "image.png",
    name: 'Test',
    route: '/test',
}


chai.use(chaiHttp)

describe('*********** MODULES ***********', () => {
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

    describe('/GET modules', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/modules')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the models', (done) => {
            chai
                .request(server)
                .get('/modules')
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
                    res.body.docs[0].methods.should.be.a('array')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].route.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the modules with filters', (done) => {
            chai
                .request(server)
                .get(`/modules?${queryParams}`)
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
                    res.body.docs[0].methods.should.be.a('array')
                    res.body.docs[0].status.should.be.a('boolean')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].route.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })
     })

     describe('/POST modules', () => {
         it('it should NOT be able to consume the route since no token was sent', (done) => {
             chai
                 .request(server)
                 .post('/modules')
                 .send(payload)
                 .end((err, res) => {
                     res.should.have.status(401)
                     done()
                 })
         })
        it('it should NOT POST modules if data its empty', (done) => {
            chai
                .request(server)
                .post('/modules')
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
        it('it should POST a modules', (done) => {
            chai
                .request(server)
                .post('/modules')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('id','status','methods','icon','name','route','createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.icon.should.be.a('string')
                    res.body.name.should.be.a('string')
                    res.body.route.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
        it('it should NOT POST a module with route that already exists', (done) => {
            chai
                .request(server)
                .post('/modules')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
    })

    describe('/GET/:id modules', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/modules/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a module if id is not exist', (done) => {
            chai
                .request(server)
                .get('/modules/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a modules by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/modules/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('id','status','methods','icon','name','route','createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.icon.should.be.a('string')
                    res.body.name.should.be.a('string')
                    res.body.route.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id modules', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/modules/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should UPDATE a modules given the id', (done) => {
            const id = createdID[0]
            payload.name = 'TEST'
            const { route, ...data } = payload
            chai
                .request(server)
                .patch(`/modules/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('id','status','methods','icon','name','route','createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.status.should.be.a('boolean')
                    res.body.methods.should.be.a('array')
                    res.body.icon.should.be.a('string')
                    res.body.name.should.be.a('string')
                    res.body.route.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
        it('it should NOT UPDATE a module with route that already exists', (done) => {
            const id = createdID[0]
            payload.route = '/users'
            chai
                .request(server)
                .patch(`/modules/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
    })


    describe('/DELETE/:id modules', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/modules/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a modules given the id', (done) => {
            payload.name ="TEST2"
            payload.route = '/test2'
            chai
                .request(server)
                .post('/modules')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/modules/${res.body.id}`)
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
            modules.destroy({ where: { id } }).then()
        })
    })
})
