/**
 * Authentication middleware. The Strategy is
 * essential for the utilization of the
 * authentication.
 */

var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done){
    done(null, user.id);
});

// Store the user
passport.deserializeUser(function (id, done){
    User.findById(id, function (err,user){
        done(err, user);
    });
});

// Strategy for handling errors and check if we have users
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 5});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
            });
        return done(null, false, req.flash('error', messages));
    }

    // Check if the email is in use already.
    User.findOne({'email': email}, function (err, user){
        if(err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'This Email is already in use by another user.'});
        }
        var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function (err, result) {
               if (err) {
                   return done(err);
               }
               return done(null, newUser);
            });
    });
}));

// Strategy for handling errors and check if we have users
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    //Check if the password is wrong and if the user exist.
    User.findOne({'email': email}, function (err, user){
        if(err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'There is no such user found.'});
        }
        if(!user.validPassword(password)) {
            return done(null, false, {message: 'The password is wrong.'});
        }

        return done(null, user);
    });
}));