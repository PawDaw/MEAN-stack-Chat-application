var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/',function(req, res, next) {
    var messages = req.flash('error');
    res.render('register', {messages: messages, hasErrors: messages.length > 0});
});


router.post('/', passport.authenticate('local.register', {
    successRedirect: '/chat',
    failureRedirect: '/register',
    failureFlash: true

}));


module.exports = router;
