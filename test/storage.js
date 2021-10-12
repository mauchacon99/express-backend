const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const server = require('../server')
const { storage } = require('../models')
const should = chai.should()
const createdID = []
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const file = `${__dirname}/../public/test.png`
const fileDoc = `${__dirname}/../public/test.docx`

chai.use(chaiHttp)
describe('*********** STORAGE ***********', () => {
    describe('/POST login', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
                .post('/login')
                .send(loginDetails)
                .end((err, res) => {
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

    describe('/GET storage', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/storage')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the storage', (done) => {
            chai
                .request(server)
                .get('/storage')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
                    res.body.docs.should.be.a('array')
                    res.body.totalDocs.should.be.a('number')
                    res.body.page.should.be.a('number')
                    res.body.totalPages.should.be.a('number')
                    res.body.docs[0].should.be.a('object')
                    res.body.docs[0].fileName.should.be.a('string')
                    res.body.docs[0].fileType.should.be.a('string')
                    res.body.docs[0].origin.should.be.a('string')
                    res.body.docs[0].small.should.be.a('string')
                    res.body.docs[0].medium.should.be.a('string')
                    res.body.docs[0].large.should.be.a('string')
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/POST storage', () => {
        it('it should POST file image', (done) => {
            chai
                .request(server)
                .post('/storage')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('files[]', fs.readFileSync(file), 'test.jpg')
                .end((err, res) => {
                    createdID.push(res.body[0].id)
                    res.should.have.status(201)
                    res.body.should.be.an('array')
                    res.body[0].should.be.a('object')
                    res.body[0].fileName.should.be.a('string')
                    res.body[0].fileType.should.be.a('string')
                    res.body[0].origin.should.be.a('string')
                    res.body[0].small.should.be.a('string')
                    res.body[0].medium.should.be.a('string')
                    res.body[0].large.should.be.a('string')
                    res.body[0].id.should.be.a('number')
                    res.body[0].createdAt.should.be.a('string')
                    res.body[0].updatedAt.should.be.a('string')
                    done()
                })
        })
        it('it should POST file Doc', (done) => {
            chai
                .request(server)
                .post('/storage')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('files[]', fs.readFileSync(fileDoc), 'test.docx')
                .end((err, res) => {
                    createdID.push(res.body[0].id)
                    res.should.have.status(201)
                    res.body.should.be.an('array')
                    res.body[0].should.be.a('object')
                    res.body[0].fileName.should.be.a('string')
                    res.body[0].fileType.should.be.a('string')
                    res.body[0].origin.should.be.a('string')
                    res.body[0].id.should.be.a('number')
                    res.body[0].createdAt.should.be.a('string')
                    res.body[0].updatedAt.should.be.a('string')
                    done()
                })
        })
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/storage')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })

    describe('/GET/:id storages', () => {
        it('it should GET/:id storages', (done) => {
            chai
                .request(server)
                .get(`/storage/${createdID[0]}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.fileName.should.be.a('string')
                    res.body.fileType.should.be.a('string')
                    res.body.origin.should.be.a('string')
                    res.body.small.should.be.a('string')
                    res.body.medium.should.be.a('string')
                    res.body.large.should.be.a('string')
                    res.body.id.should.be.a('number')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/storage')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })

    describe('/DELETE/:id storages', () => {
        it('it should DELETE/:id storages', (done) => {
            chai
                .request(server)
                .delete(`/storage/${createdID[0]}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/storage')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })
})
