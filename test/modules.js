const faker = require("faker")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require('../server')
const {modules} = require('../models')
const loginDetails = {
    email: 'admin@admin.com',
    password: '123456'
}
let token = ''
const createdID = []
const queryParams = 'fields=route&filter=phones'


const payload = {
    status: true,
    methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
    icon: null,
    name: 'Phones',
    route: '/phones',
}


chai.use(chaiHttp)

describe('*********** MODELS ***********', () => {
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
                    //array method was not tested because the size varies
                    res.body.docs[0].status.should.be.a('boolean')  
                    //res.body.docs[0].icon.should.be.a('string')
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
                    //array method was not tested because the size varies
                    res.body.docs[0].status.should.be.a('boolean')  
                    //res.body.docs[0].icon.should.be.a('string')
                    res.body.docs[0].name.should.be.a('string')
                    res.body.docs[0].route.should.be.a('string')
                    res.body.docs[0].createdAt.should.be.a('string')
                    res.body.docs[0].updatedAt.should.be.a('string')
                   
                    done()
                })
        })
     })

   /*  describe('/POST modules', () => {
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
        })*/
       /* it('it should NOT POST a user with email that already exists', (done) => {
            payload.email = 'admin@admin.com'
            chai
                .request(server)
                .post('/users')
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
    


    after(() => {
        createdID.forEach(async (id) => {
            await modules.destroy({ where: { id } })
        })
    })
})
