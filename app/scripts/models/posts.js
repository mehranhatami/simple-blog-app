var
  Backbone = require('backbone'),
  Post = require('./post');

var Posts = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
});

module.exports = Posts;