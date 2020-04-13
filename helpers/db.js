const mongoose = require('mongoose');

const url = 'mongodb+srv://movie-api-user:celal2705@movie-api-cluster-xf7lc.mongodb.net/test?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = () => {
    mongoose.connect(url, options);
    mongoose.connection.on('open', () => {
        // console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};