
/**
 * This file contains the relevant information
 * and definitions for the reviews. The array of
 * the products will be seeded to the database.
 */

var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews');

var products = [

    new Product({
        imagePath: '../images/avengers.png',
        title: 'The Avengers',
        description: 'The heroes on Earth defend it against an evil Asgardian! It is fun, lots of action and many funny jokes.',
        rating: 9
    }),
    new Product({
        imagePath: '../images/battleship.png',
        title: 'Battleship',
        description: 'Earth is attacked by aliens and some tough guys have to defend it. Bad acting from the entire cast and some stupid scenes.',
        rating: 4
    }),
    new Product({
        imagePath: '../images/dredd.png',
        title: 'Dredd',
        description: 'An underrated sci-fi action film with a lot of cool action scenes and some great characters. A must see for fans of the genre.',
        rating: 8
    }),
    new Product({
        imagePath: '../images/baywatch.png',
        title: 'Baywatch',
        description: 'Attractive men and women run around the beach but the movie is awful and uninspiring and lazy and just boring.',
        rating: 3
    }),
    new Product({
        imagePath: '../images/bride.png',
        title: 'Bridesmaids',
        description: 'In a group of women one of them is getting married. What happens next is a bonkers comedy that will make you laugh like crazy.',
        rating: 8
    }),
    new Product({
        imagePath: '../images/aliens.png',
        title: 'Aliens',
        description: 'This time it is war! This is the greatest movie ever made and no one can change my mind. One of the best sequels as well.',
        rating: 10
    }),
    new Product({
        imagePath: '../images/deep.png',
        title: 'Deep Rising',
        description: 'A small cult classic from the 90s that proves a lot of imagination and ripping off Alien can be good. A fun action film.',
        rating: 6
    }),
    new Product({
        imagePath: '../images/speed.png',
        title: 'Speed',
        description: 'Get ready for rush hour. The summer heat is coming to LA and the heat in the theater is rising when the action and tension is sky-high in this masterpiece.',
        rating: 9
    }),
    new Product({
        imagePath: '../images/gods.png',
        title: 'Gods of Egypt',
        description: 'Some Gods in the desert fight each other in a bunch of boring and bland scenes. The film is full of CGI and loud noises that it hurts.',
        rating: 4
    }),
    new Product({
        imagePath: '../images/stardust.png',
        title: 'Stardust',
        description: 'Although Lord of the Rings and Harry Potter own the Fantasy genre this film can not be overlooked. Stardust has a unique spark that makes it incredible.',
        rating: 9
    }),
    new Product({
        imagePath: '../images/planet.png',
        title: 'Treasure Planet',
        description: 'What turned out to be a box-office bomb is now a beloved classic that has heart and humor for the entire family. A must see for Disney fans.',
        rating: 9
    }),
    new Product({
        imagePath: '../images/rush.png',
        title: 'Rush Hour',
        description: 'Two odd cops team up and learn to work together in this action comedy that has something for everyone. Prepare some popcorn.',
        rating: 8
    }),
    new Product({
        imagePath: '../images/parasite.png',
        title: 'Parasite',
        description: 'The South Korean movie that dominated the Academy Awards and surprised every movie goers around the globe.',
        rating: 9
    }),
    new Product({
        imagePath: '../images/jaws.png',
        title: 'Jaws',
        description: 'The first blockbuster ever. Steven Spielberg teams up with John Williams to deliver a perfect horror drama that makes you stay out of the water.',
        rating: 10
    }),
    new Product({
        imagePath: '../images/lone.png',
        title: 'The Lone Ranger',
        description: 'A gigantic flop that cost the studio millions of dollar. However, this western does have a certain charm to it and should not be overlooked.',
        rating: 7
    }),
    new Product({
        imagePath: '../images/clash.png',
        title: 'Clash of the Titans 2010',
        description: 'Sam Worthington became a star with the hit movie Avatar but now it seems that his career will go straight down the toilet with this stinker.',
        rating: 5
    }),
    new Product({
        imagePath: '../images/jakten.png',
        title: 'Jakten',
        description: 'This danish movie, also known as The Hunt, is a powerful drama with a strong lead acting performance and many scenes that punch you hard in the gut.',
        rating: 10
    })
];

var done =0;
//Loop through all the reviews and save them to the database. Exit when all products have been looped through.
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