var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.blogSchema = new Schema({
    author: String,
    body:   String,
    likes: Number
});
exports.Blog = mongoose.model('Blog',exports.blogSchema);
