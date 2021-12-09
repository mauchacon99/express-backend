const chai = require('chai')
const chaiHttp = require('chai-http')
const { payment } = require('../models')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
// const queryParams = 'fields=type&relations=userPA.name&filter=admin&sort=createdAt&page=1&limit=10&order=DESC'
const queryParams = ''

const payload = {
    userId: 1,
    description: 'Mollit anim non exercitation amet eu aliqua irure quis.',
    transactionId: 'ipi_1HJsAi2qZvKhlo2Dfr8US8rS',
    transaction: {
      "id": "ipi_1HJsAi2qZvKhlo2Dfr8US8rS",
      "object": "issuing.transaction",
      "amount": 32.99,
      "amount_details": {
        "atm_fee": null
      },
      "authorization": "iauth_1JIdAO2eZvKYlo2CNzjj2lif",
      "balance_transaction": "txn_1JIdAm2eZvKYlo2CHfFOwGfr",
      "card": "ic_1JId7I2eZvKYlo2CQcSKF8Df",
      "cardholder": "ich_1JId712eZvKYlo2C0lXNIoYn",
      "created": 1627580251,
      "currency": "usd",
      "dispute": null,
      "livemode": false,
      "merchant_amount": 32.99,
      "merchant_currency": "usd",
      "merchant_data": {
        "category": "computer_software_stores",
        "category_code": "5734",
        "city": "SAN FRANCISCO",
        "country": "US",
        "name": "STRIPE",
        "network_id": "1234567890",
        "postal_code": "94103",
        "state": "CA"
      },
      "metadata": {
        "order_id": "willfeug@gmail.com"
      },
      "type": "capture",
      "wallet": null
    },
    amount: 32.99,
    type: 'coach-subscription',
}

chai.use(chaiHttp)

describe('*********** PAYMENTS ***********', () => {
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

    describe('/GET payments', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/payments')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })

        it('it should GET the payments', (done) => {
            chai
                .request(server)
                .get(`/payments`)
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
                        'userId',
                        'description',
                        'transactionId',
                        'transaction',
                        'amount',
                        'type',
                        'userPA',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].transactionId.should.be.a('string')
                    res.body.docs[0].transaction.should.be.a('object')
                    res.body.docs[0].amount.should.be.a('number')
                    res.body.docs[0].type.should.be.a('string')
                    res.body.docs[0].userPA.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })

        it('it should GET the payments with filters', (done) => {
            chai
                .request(server)
                .get(`/payments?${queryParams}`)
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
                        'userId',
                        'description',
                        'transactionId',
                        'transaction',
                        'amount',
                        'type',
                        'userPA',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.docs[0].id.should.be.a('number')
                    res.body.docs[0].userId.should.be.a('number')
                    res.body.docs[0].transactionId.should.be.a('string')
                    res.body.docs[0].transaction.should.be.a('object')
                    res.body.docs[0].amount.should.be.a('number')
                    res.body.docs[0].type.should.be.a('string')
                    res.body.docs[0].userPA.should.be.a('object')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   done()
                })
        })
    })

    describe('/POST payments', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .post('/payments')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT POST payments if data its empty', (done) => {
            chai
                .request(server)
                .post('/payments')
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
        it('it should POST a payments', (done) => {
            chai
                .request(server)
                .post('/payments')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'description',
                        'transactionId',
                        'transaction',
                        'amount',
                        'type',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.transactionId.should.be.a('string')
                    res.body.transaction.should.be.a('object')
                    res.body.amount.should.be.a('number')
                    res.body.type.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    createdID.push(res.body.id)
                    done()
                })
        })
    })

    describe('/GET/:id payments', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/payments/${id}`)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT GET a payment if id is not exist', (done) => {
            chai
                .request(server)
                .get('/payments/100')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.msg.should.be.a('string')
                    done()
                })
        })
        it('it should GET a payment by the given id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .get(`/payments/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'description',
                        'transactionId',
                        'transaction',
                        'amount',
                        'type',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.transactionId.should.be.a('string')
                    res.body.transaction.should.be.a('object')
                    res.body.amount.should.be.a('number')
                    res.body.type.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/PATCH/:id payments', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/payments/${id}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should NOT PATCH payment if data its empty', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/payments/${id}`)
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
        it('it should UPDATE a payments given the id', (done) => {
            const id = createdID[0]
            chai
                .request(server)
                .patch(`/payments/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((error, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys(
                        'id',
                        'userId',
                        'description',
                        'transactionId',
                        'transaction',
                        'amount',
                        'type',
                        'createdAt',
                        'updatedAt'
                    )
                    res.body.id.should.be.a('number')
                    res.body.userId.should.be.a('number')
                    res.body.transactionId.should.be.a('string')
                    res.body.transaction.should.be.a('object')
                    res.body.amount.should.be.a('number')
                    res.body.type.should.be.a('string')
                    res.body.createdAt.should.be.a('string')
                    res.body.updatedAt.should.be.a('string')
                    done()
                })
        })
    })

    describe('/DELETE/:id payments', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .delete('/payments/1')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should DELETE a payments given the id', (done) => {
            chai
                .request(server)
                .post('/payments')
                .set('Authorization', `Bearer ${token}`)
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(201)
                    chai
                        .request(server)
                        .delete(`/payments/${res.body.id}`)
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
            payment.destroy({ where: { id } }).then()
        })
    })
})
