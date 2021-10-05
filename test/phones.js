const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const phone = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=userId&filter=1'
const payload = {
    userId: 1,
    number: '3112123658',
    internationalNumber: '+57 311 2123658',
    nationalNumber: '311 2123658',
    countryCode: 'CO',
    dialCode: '+57'
}

chai.use(chaiHttp)

describe('*********** PHONES ***********', () => {
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

    describe('/GET phones', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/phones')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the phones', (done) => {
            chai
                .request(server)
                .get('/phones')
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
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].number.should.be.a('string')
                    res.body.docs[0].internationalNumber.should.be.a('string')
                    res.body.docs[0].nationalNumber.should.be.a('string')
                    res.body.docs[0].countryCode.should.be.a('string')
                    res.body.docs[0].dialCode.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })
        it('it should GET the users with filters', (done) => {
            chai
                .request(server)
                .get(`/phones?${queryParams}`)
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
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].number.should.be.a('string')
                    res.body.docs[0].internationalNumber.should.be.a('string')
                    res.body.docs[0].nationalNumber.should.be.a('string')
                    res.body.docs[0].countryCode.should.be.a('string')
                    res.body.docs[0].dialCode.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/POST user', () => {
        it('it should NOT POST user if data its empty', (done) => {
            chai
                .request(server)
                .post('/phones')
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
                .post('/phones')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id','userId','number', 'internationalNumber', 'nationalNumber', 'countryCode', 'dialCode', 'createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.number.should.be.a('string')
                    res.body.internationalNumber.should.be.a('string')
                    res.body.nationalNumber.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.dialCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })

      /*  it('it should NOT POST a user with number that already exists', (done) => {
            payload.nationalNumber = "311 2123558"
            chai
                .request(server)
                .post('/phones')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })*/
    })



    
    describe('/GET/:id phones', () => {
        it('it should GET a phones by the given id', (done) => {
            const id = createdID.slice(-1).pop()
            chai
                .request(server)
                .get(`/phones/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id','userId','number', 'internationalNumber', 'nationalNumber', 'countryCode', 'dialCode', 'createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.number.should.be.a('string')
                    res.body.internationalNumber.should.be.a('string')
                    res.body.nationalNumber.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.dialCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    
    describe('/PATCH/:id phones', () => {
        it('it should UPDATE a phones given the id', (done) => {
            const id = createdID.slice(-1).pop()
            payload.number = '3112123000'
            chai
                .request(server)
                .patch(`/phones/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id','userId','number', 'internationalNumber', 'nationalNumber', 'countryCode', 'dialCode', 'createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.number.should.be.a('string')
                    res.body.internationalNumber.should.be.a('string')
                    res.body.nationalNumber.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.dialCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
       /* it('it should NOT UPDATE a phones with email that already exists', (done) => {
            const id = createdID.slice(-1).pop()
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
        })*/
    })

    describe('/DELETE/:id phones', () => {
        it('it should DELETE a phones given the id', (done) => {
            payload.number ="311728930" 
            chai
                .request(server)
                .post('/phones')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/phones/${res.body.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((error, result) => {
                            result.should.have.status(200)
                            done()
                        })
                })
        })
    })

    after(() => {
        createdID.forEach(async (id) => {
            await phone.destroy({ where: { id } })
        })
    })
})
