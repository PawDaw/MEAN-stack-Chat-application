var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};


exports.RoomSchema = new Schema({
    name: String,

});


exports.Room = mongoose.model('Room', exports.RoomSchema);