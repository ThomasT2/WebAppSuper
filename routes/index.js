/**
 * This file has all the routes of the
 * application. Both get and post methods
 * are defined for the different parts.
 */

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Collection = require('../models/collection');
var Product = require('../models/product');
var Selection = require('../models/user-selection');

// Unique value for protection
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET the main home page */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs){
        var productBlocks = [];
        var blockSize = 3;
        for(var i=0; i< docs.length; i += blockSize){
            productBlocks.push(docs.slice(i, i + blockSize));
        }
        res.render('main/index', { title: 'The Review Center', products: productBlocks });
    }).lean();
});

router.get('/main/help', function (req,res,next) { //.use
    res.render('main/help');
});

router.get('/add-to-collection/:id', function (req,res,next){
    var reviewId = req.params.id;
    var portfolio = new Collection(req.session.portfolio ? req.session.portfolio : {});

    Product.findById(reviewId, function (err, review){
        if(err) {
            return res.redirect('/');
        }
        portfolio.add(review, review.id);
        req.session.portfolio = portfolio;
        console.log(req.session.portfolio);
        res.redirect('/');
    });
});

// Remove one review by reducing it.
router.get('/reduce/:id', function (req,res,next){
    var reviewId = req.params.id;
    var portfolio = new Collection(req.session.portfolio ? req.session.portfolio : {});

    portfolio.reduceOneReview(reviewId);
    req.session.portfolio = portfolio;
    res.redirect('/main/collection');
});

// Remove all the reviews in the collection.
router.get('/remove/:id', function (req,res,next){
    var reviewId = req.params.id;
    var portfolio = new Collection(req.session.portfolio ? req.session.portfolio : {});

    portfolio.removeReview(reviewId);
    req.session.portfolio = portfolio;
    res.redirect('/main/collection');
});

router.get('/main/collection', isUserLoggedInCollection, function (req, res, next){
    if(!req.session.portfolio){
        return res.render('main/collection', {products: null});
    }
    var portfolio = new Collection(req.session.portfolio);
    var messages = req.flash('error');
    res.render('main/collection', {products: portfolio.generateArray(), csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/main/collection', function (req, res, next){

    if(!req.session.portfolio){
        return res.redirect('/main/collection');
    }

    var portfolio = new Collection(req.session.portfolio);

    var selection = new Selection({
        user: req.user,
        portfolio: portfolio
    });
    selection.save(function (err, result){
        req.session.portfolio = null;
        res.redirect('/');
    });
});

router.get('/user/profile', isUserLoggedIn, function (req, res, next){
    Selection.find({user: req.user}, function (err, selections){
        if(err){
            return res.write('There is an Error!');
        }
        var portfolio;
        selections.forEach(function (selection){
            portfolio = new Collection(selection.portfolio);
            selection.reviews = portfolio.generateArray();
        });
        res.render('user/profile', { selections: selections });
    });
});

router.get('/user/logout', isUserLoggedIn, function (req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/', isUserNotLoggedIn, function (req,res,next) { //.use
    next();
});

router.get('/user/signup', function (req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/signin', function (req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

module.exports = router;

// Check if user is logged in.
function isUserLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
// Check if user is not logged in.
function isUserNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');

}
// The user will be directed to the log in if they try to access the collection as non-logged in.
function isUserLoggedInCollection(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}