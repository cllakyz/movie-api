const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({
                username: 'cllakyz',
                password: '123456'
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET directors', () => {
        it('should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director', () => {
        it('should POST a director', (done) => {
            chai.request(server)
                .post('/api/directors')
                .send({
                    fullname: 'Test Yönetmen',
                    born: '1959, Istanbul',
                    bio: 'lorem ipsum',
                })
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('fullname');
                    res.body.data.should.have.property('born');
                    res.body.data.should.have.property('bio');
                    res.body.data.should.have.property('_id');
                    directorId = res.body.data._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id director', () => {
        it('should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.should.have.property('fullname');
                    res.body.data.should.have.property('born');
                    res.body.data.should.have.property('bio');
                    res.body.data.should.have.property('movies');
                    res.body.data.should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });

    describe('/PUT/:director_id director', () => {
        it('should UPDATE a director given by id', (done) => {
            chai.request(server)
                .put('/api/directors/' + directorId)
                .send({
                    fullname: 'Test Yönetmen test',
                    born: '1959, Istanbul test',
                    bio: 'lorem ipsum test',
                })
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('fullname').eql('Test Yönetmen test');
                    res.body.data.should.have.property('born').eql('1959, Istanbul test');
                    res.body.data.should.have.property('bio').eql('lorem ipsum test');
                    res.body.data.should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });

    describe('/DELETE/:director_id director', () => {
        it('should DELETE a director given by id', (done) => {
            chai.request(server)
                .delete('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    done();
                });
        });
    });
});