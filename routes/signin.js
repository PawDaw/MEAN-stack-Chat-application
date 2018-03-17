var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');


// 1. routes
var register = require('../routes/register');


// 2. routes
router.use('/register', register);


//  define token to register form
router.get('/',function(req, res, next) {
    var messages = req.flash('error');
    res.render('signin', { messages: messages, hasErrors: messages.length > 0});
});


// redirect to Angular index.html
router.get('/chat',function (req,res, next) {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/chat',
    failureRedirect: '/',
    failureFlash: true

}));


module.exports = router;