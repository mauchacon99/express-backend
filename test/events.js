const faker = require("faker")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require('../server')
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''

chai.use(chaiHttp)

describe('*********** EVENTS ***********', () => {
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

    // describe('/GET events', () => {
    //     it('it should NOT be able to consume the route since no token was sent', (done) => {
    //         chai
    //             .request(server)
    //             .get('/events')
    //             .end((err, res) => {
    //                 res.should.have.status(401)
    //                 done()
    //             })
    //     })
    //     it('it should GET all events', (done) => {
    //         chai
    //             .request(server)
    //             .get('/events')
    //             .set('Authorization', `Bearer ${token}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200)
    //                 res.body.should.be.an('object')
    //                 res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
    //                 res.body.docs.should.be.a('array')
    //                 res.body.totalDocs.should.be.a('number')
    //                 res.body.page.should.be.a('number')
    //                 res.body.totalPages.should.be.a('number')
    //                 res.body.docs[0].id.should.be.a('number')
    //                 res.body.docs[0].userId.should.be.a('number')
    //                 res.body.docs[0].event.should.be.a('string')
    //                 res.body.docs[0].createdAt.should.be.a('string')
    //                 res.body.docs[0].updatedAt.should.be.a('string')
    //                 done()
    //             })
    //     })
    //
    //     it('it should GET all events with filters', (done) => {
    //         chai
    //             .request(server)
    //             .get(`/events?${queryParams}`)
    //             .set('Authorization', `Bearer ${token}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200)
    //                 res.body.should.be.an('object')
    //                 res.body.should.include.keys('docs', 'totalDocs', 'page', 'totalPages')
    //                 res.body.docs.should.be.a('array')
    //                 res.body.totalDocs.should.be.a('number')
    //                 res.body.page.should.be.a('number')
    //                 res.body.totalPages.should.be.a('number')
    //                 res.body.docs[0].id.should.be.a('number')
    //                 res.body.docs[0].userId.should.be.a('number')
    //                 res.body.docs[0].event.should.be.a('string')
    //                 res.body.docs[0].createdAt.should.be.a('string')
    //                 res.body.docs[0].updatedAt.should.be.a('string')
    //                 done()
    //             })
    //     })
    // })

    describe('/GET/:id event', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/events/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET a event by the given id', (done) => {
            chai
                .request(server)
                .get('/events/1')
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
                    res.body.docs[0].event.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                    done()
                })
        })
    })
})
