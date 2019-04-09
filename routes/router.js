const passport = require('passport');
const express = require('express');
const app = express();
const models = require('../models/models');
const { check, validationResult } = require('express-validator/check');

// Import controllers
const userController = require('../controllers/userController');

// Checks if user is authenticated
ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        //console.log(req.user);
        //res.json(req.user);
        return next();
    } else {
        //console.log('Not authenticated.')
        res.json({
            authenticated: false
        });
    }
};

    // User routes
    app.get('/user', ensureAuthenticated, userController.get);
    app.get('/allUsers', userController.getAll);
    app.get('/logout', userController.logout);
    app.post('/register', userController.createNewUser);
    app.post('/updateUser', ensureAuthenticated, userController.updateUser);
    app.post('/login', userController.loginAuthentication);


    module.exports = app;
