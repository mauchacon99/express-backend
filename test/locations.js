const chai = require('chai')
const chaiHttp = require('chai-http')
const { location } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=countryName&filter=Colombia'

const payload = {
    userId: 1,
    lat: '5.6545875',
    lng: '-74.1009379',
    address: 'Florida blanca calle 3 #',
    cityName: 'Bucaramanga',
    countryName: 'Colombia',
    countryCode: 'co',
}

chai.use(chaiHttp)

describe('*********** LOCATIONS ***********', () => {
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

    describe('/GET locations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/locations')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all locations', (done) => {
            chai
                .request(server)
                .get('/locations')
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
                    res.body.docs[0].lat.should.be.a('string')
                    res.body.docs[0].lng.should.be.a('string')
                    res.body.docs[0].address.should.be.a('string')
                    res.body.docs[0].cityName.should.be.a('string')
                    res.body.docs[0].countryName.should.be.a('string')
                    res.body.docs[0].countryCode.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })

        it('it should GET the locations with filters', (done) => {
            chai
                .request(server)
                .get(`/locations?${queryParams}`)
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
                    res.body.docs[0].lat.should.be.a('string')
                    res.body.docs[0].lng.should.be.a('string')
                    res.body.docs[0].address.should.be.a('string')
                    res.body.docs[0].cityName.should.be.a('string')
                    res.body.docs[0].countryName.should.be.a('string')
                    res.body.docs[0].countryCode.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
|                   done()
                })
        })
    })

    describe('/POST locations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/locations')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST locations if data its empty', (done) => {
            chai
                .request(server)
                .post('/locations')
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
        it('it should POST a locations', (done) => {
            chai
                .request(server)
                .post('/locations')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'lat',
                        'lng',
                        'address',
                        'cityName',
                        'countryName',
                        'countryCode',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.lat.should.be.a('string')
                    res.body.lng.should.be.a('string')
                    res.body.address.should.be.a('string')
                    res.body.cityName.should.be.a('string')
                    res.body.countryName.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id locations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/locations/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a location if id is not exist', (done) => {
            chai
                .request(server)
                .get('/locations/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a location by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/locations/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id','userId','lat', 'lng', 'address', 'cityName', 'countryName', 'countryCode','createdAt','updatedAt')
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.lat.should.be.a('string')
                    res.body.lng.should.be.a('string')
                    res.body.address.should.be.a('string')
                    res.body.cityName.should.be.a('string')
                    res.body.countryName.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id locations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/locations/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH location if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/locations/${id}`)
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
        it('it should UPDATE a locations given the id', (done) => {
            const id = createdID[0]
            payload.lat = '9.6545875'
            chai
                .request(server)
                .patch(`/locations/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'lat',
                        'lng',
                        'address',
                        'cityName',
                        'countryName',
                        'countryCode',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.lat.should.be.a('string')
                    res.body.lng.should.be.a('string')
                    res.body.address.should.be.a('string')
                    res.body.cityName.should.be.a('string')
                    res.body.countryName.should.be.a('string')
                    res.body.countryCode.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id locations', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/locations/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a locations given the id', (done) => {
            payload.cityName ="Barranquilla"
            chai
                .request(server)
                .post('/locations')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/locations/${res.body.id}`)
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
            location.destroy({ where: { id } }).then()
        })
    })
})
