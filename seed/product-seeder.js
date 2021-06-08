var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews');

var products = [

    new Product({
        imagePath: 'https://i.pinimg.com/originals/04/e8/21/04e8210c2048e31d2049a7876613f54d.jpg',
        title: 'Avengers',
        description: 'superheroes',
        rating: 9
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/M/MV5BMjI5NTM5MDA2N15BMl5BanBnXkFtZTcwNjkwMzQxNw@@._V1_.jpg',
        title: 'Battleship',
        description: 'dumb action',
        rating: 4
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/M/MV5BODkyNDQzMzUzOF5BMl5BanBnXkFtZTcwODYyMDEyOA@@._V1_.jpg',
        title: 'Dredd',
        description: 'underrated hard R',
        rating: 8
    })
];

var done =0;
for (var i = 0; i < products.length; i++){
    products[i].save(function (err,results){
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}