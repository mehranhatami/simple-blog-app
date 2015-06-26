var
  Backbone = window.Backbone,
  Post = require('./post');

module.exports = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
});