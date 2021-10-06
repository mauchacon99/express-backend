const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { user } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fileds=name,email&relations=roleU.name&filter=admin'
const userSend = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.words(8),
    roleId: 2
}

chai.use(chaiHttp)

describe('*********** USERS ***********', () => {
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

    describe('/GET users', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the users', (done) => {
            chai
                .request(server)
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].lastname.should.be.a('string')
                    res.body.docs[0].email.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    res.body.docs[0].roleU.should.be.a('object')
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].roleU.should.include.keys('name', 'description', 'createdAt', 'updatedAt')
                    done()
                })
        })
        it('it should GET the users with filters', (done) => {
            chai
                .request(server)
                .get(`/users?${queryParams}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].lastname.should.be.a('string')
                    res.body.docs[0].email.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    res.body.docs[0].roleU.should.be.a('object')
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].roleId.should.be.a('number')
                    res.body.docs[0].roleU.should.include.keys('name', 'description', 'createdAt', 'updatedAt')
                    res.body.docs[0].should.have.property('email').eql('admin@admin.com')
                    done()
                })
        })
    })

    describe('/POST user', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/users')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST user if data its empty', (done) => {
            chai
                .request(server)
                .post('/users')
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
        it('it should POST a user', (done) => {
            chai
                .request(server)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id', 'name', 'lastname', 'roleId', 'email', 'updatedAt', 'createdAt')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.lastname.should.be.a('string')
                    res.body.email.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
        it('it should NOT POST a user with email that already exists', (done) => {
            userSend.email = 'admin@admin.com'
            chai
                .request(server)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
    })

    describe('/GET/:id user', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a user if id is not exist', (done) => {
            chai
                .request(server)
                .get('/users/10')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a user by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/users/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.include.keys('id', 'name', 'lastname', 'roleId', 'roleU', 'email', 'updatedAt', 'createdAt')
                    res.body.roleU.should.include.keys('name', 'description', 'createdAt', 'updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.lastname.should.be.a('string')
                    res.body.email.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id user', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .patch('/users/1')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH user if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/users/${id}`)
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
        it('it should UPDATE a user given the id', (done) => {
            const id = createdID[0]
            userSend.name = 'user admin'
            const { password, email, ...data } = userSend
            chai
                .request(server)
                .patch(`/users/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('name').eql('user admin')
                    res.body.should.include.keys('id', 'name', 'lastname', 'roleId', 'email', 'updatedAt', 'createdAt')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.lastname.should.be.a('string')
                    res.body.email.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
        it('it should NOT UPDATE a user with email that already exists', (done) => {
            const id = createdID[0]
            userSend.email = 'admin@admin.com'
            chai
                .request(server)
                .patch(`/users/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id user', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/users/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a user given the id', (done) => {
            userSend.email = 'user@user.com'
            chai
                .request(server)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/users/${res.body.id}`)
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
            user.destroy({ where: { id } }).then()
        })
    })
})