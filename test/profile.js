const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { user } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'personal@personal.com',
    password: '123456'
}
let token = ''
const userSend = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'personal@personal.com',
    skills: ['skill1', 'skill2'],
    preferences: ['pref1', 'pref2'],
    instagram: `@${faker.name.firstName()}`,
    facebook: faker.name.findName(),
    linkedin: faker.name.findName(),
    professions: ['Designer', 'Computer Engineer'],
    languages: ['English', 'Spanish'],
}

chai.use(chaiHttp)

describe('*********** PROFILE ***********', () => {
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

    describe('/GET user profile', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/profile')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET user profile', (done) => {
            chai
                .request(server)
                .get('/profile')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.include.keys('id', 'name', 'lastname', 'roleId', 'roleU', 'userEX', 'email', 'skills', 'preferences', 'instagram', 'facebook', 'linkedin', 'professions', 'languages', 'updatedAt', 'createdAt')
                    res.body.roleU.should.include.keys('name', 'description', 'createdAt', 'updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.avatar.should.be.a('object')
                    res.body.storageId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.lastname.should.be.a('string')
                    res.body.email.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    res.body.verification.should.be.a('string')
                    res.body.should.include.keys('vendor', 'description')
                    res.body.verified.should.be.a('boolean')
                    res.body.forgotPassword.should.be.a('boolean')
                    res.body.userL.should.be.a('array')
                    res.body.userP.should.be.a('array')
                    res.body.userEX.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST user profile', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/profile')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        // it('it should NOT POST user if data its empty', (done) => {
        //     chai
        //         .request(server)
        //         .post('/profile')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send({})
        //         .end((err, res) => {
        //             res.should.have.status(422)
        //             res.body.should.be.a('object')
        //             res.body.should.have.property('errors')
        //             res.body.errors.msg.should.be.a('array')
        //             done()
        //         })
        // })
        it('it should POST a user edit profile', (done) => {
            chai
                .request(server)
                .post('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'name',
                        'description',
                        'storageId',
                        'lastname',
                        'roleId',
                        'email',
                        'skills',
                        'preferences',
                        'instagram',
                        'facebook',
                        'linkedin',
                        'professions',
                        'languages',
                        'updatedAt',
                        'createdAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.roleId.should.be.a('number')
                    res.body.name.should.be.a('string')
                    res.body.lastname.should.be.a('string')
                    res.body.email.should.be.a('string')
                    res.body.verification.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/POST change password profile', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/profile/password')
                .send(userSend)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST change password if data its empty', (done) => {
            chai
                .request(server)
                .post('/profile/password')
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
        it('it should POST change password profile', (done) => {
            chai
                .request(server)
                .post('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    oldPassword: '123456',
                    newPassword: '123456'
                })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.msg.should.be.a('string')
                    done()
                })
        })
        it('it should NOT POST change password profile', (done) => {
            chai
                .request(server)
                .post('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    oldPassword: '654321',
                    newPassword: '123456'
                })
                .end((err, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })
})
