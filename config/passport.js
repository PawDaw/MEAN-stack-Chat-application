var passport = require('passport');
var User = require('../model/user');
var LocalStrategy = require('passport-local').Strategy;




passport.serializeUser(function (user,done) {
    done(null, user.id);

});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });

});

// Register
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email,password, done) {

    // validate files in the form
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid pass').notEmpty().isLength({min:1});

    var errors  = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        // done (no technical errors, false - not success, message with error )
        return done(null, false, req.flash('error',messages));
    }

    User.findOne({'email':email}, function(err,user){
        if (err){
            return done(err);
        }
        if(user){
            return done(null,false, { message: 'email is already in use.'} );
        }
        var newUser = new User();
         newUser.email = email;
         newUser.password = newUser.encryptPasssword(password);
         newUser.save(function(err, result){
             if(err){
                 return done(err);
             }

             // save USER name to locals variable
             req.app.locals.userName = newUser.email;

             return done (null, newUser);
         })
    });


}));


// Sign IN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email,password, done) {

    // validate files in the form
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid pass').notEmpty();

    var errors  = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        // done (no technical errors, false - not success, message with error )
        return done(null, false, req.flash('error',messages));
    }

    User.findOne({'email':email}, function(err,user){
        if (err){
            return done(err);
        }
        if(!user){
            return done(null,false, { message: 'No user found.'} );
        }
        if (!user.validPassword(password)){
            return done(null,false, { message: 'Wrong password.'} );
        }

        // save USER name to locals variable
        req.app.locals.userName = user.email;

        return done (null, user);

    });



}));
