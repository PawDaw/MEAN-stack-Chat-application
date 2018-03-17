var mongoose = require ('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var exports = module.exports = {};



var UserSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
   /* username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },*/
    password: {
        type : String,
        required : true,
        trim: true
    }

    /*role: {
        type : String,
        enum : ['Client','Manager','Admin'],
        default : 'Manager',
    }*/
});

UserSchema.methods.encryptPasssword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
};

//exports.User = mongoose.model('user',exports.UserSchema);

var User = mongoose.model('User', UserSchema);
module.exports = User;

