const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie-api-user:celal2705@movie-api-cluster-xf7lc.mongodb.net/test?retryWrites=true&w=majority');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });
};