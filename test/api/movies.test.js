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
        });
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
                    year: '2000',
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
        });
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
        });
    });
});