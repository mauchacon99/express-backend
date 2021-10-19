const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const payload = { input: "paris" }

chai.use(chaiHttp)

describe('*********** GOOGLE PLACES ***********', () => {
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

    describe('/POST get places', () => {
        it('it should NOT POST places if data its empty', (done) => {
            chai
                .request(server)
                .post('/places')
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
        it('it should POST a places', (done) => {
            if(process.env.API_KEY_GOOGLE) {
                chai
                    .request(server)
                    .post('/places')
                    .set('Authorization', `Bearer ${token}`)
                    .send(payload)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        done()
                    })
            } else {
                console.log('**** you need api key ****')
                done()
            }
        })
    })
})
