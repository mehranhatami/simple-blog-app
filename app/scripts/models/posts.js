var
  Backbone = window.Backbone,
  Post = require('./post'),
  Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });

module.exports = Posts;