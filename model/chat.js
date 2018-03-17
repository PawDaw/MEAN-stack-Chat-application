var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};


exports.ChatSchema = new Schema({
    room: String,
    nickname: String,
    message: String,
    updated_at: { type: Date, default: Date.now },
});


exports.Chat = mongoose.model('Chat', exports.ChatSchema);
