const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
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

    describe('/GET movies', () => {
        it('should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        }).timeout(10000);
    });

    describe('/POST movie', () => {
        it('should POST a movie', (done) => {
            chai.request(server)
                .post('/api/movies')
                .send({
                    title: 'Udemy',
                    director_id: '5e9351106774fb1da8493a7e',
                    category: 'Komedi',
                    country: 'Turkiye',
                    year: 2000,
                    imdb_score: 8,
                })
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('title');
                    res.body.data.should.have.property('director_id');
                    res.body.data.should.have.property('category');
                    res.body.data.should.have.property('country');
                    res.body.data.should.have.property('year');
                    res.body.data.should.have.property('imdb_score');
                    res.body.data.should.have.property('_id');
                    movieId = res.body.data._id;
                    done();
                });
        }).timeout(10000);
    });

    describe('/GET/:movie_id movie', () => {
        it('should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('title');
                    res.body.data.should.have.property('director_id');
                    res.body.data.should.have.property('category');
                    res.body.data.should.have.property('country');
                    res.body.data.should.have.property('year');
                    res.body.data.should.have.property('imdb_score');
                    res.body.data.should.have.property('_id').eql(movieId);
                    done();
                });
        }).timeout(10000);
    });

    describe('/PUT/:movie_id movie', () => {
        it('should UPDATE a movie given by id', (done) => {
            chai.request(server)
                .put('/api/movies/' + movieId)
                .send({
                    title: 'Udemy Test',
                    director_id: '5e9351106774fb1da8493a7f',
                    category: 'Suç',
                    country: 'France',
                    year: 2004,
                    imdb_score: 7.8,
                })
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('title').eql('Udemy Test');
                    res.body.data.should.have.property('director_id').eql('5e9351106774fb1da8493a7f');
                    res.body.data.should.have.property('category').eql('Suç');
                    res.body.data.should.have.property('country').eql('France');
                    res.body.data.should.have.property('year').eql(2004);
                    res.body.data.should.have.property('imdb_score').eql(7.8);
                    res.body.data.should.have.property('_id').eql(movieId);
                    done();
                });
        }).timeout(10000);
    });

    describe('/DELETE/:movie_id movie', () => {
        it('should DELETE a movie given by id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    done();
                });
        }).timeout(10000);
    });
});