var
  Backbone = require('backbone'),
  Comments = require('./comments');

var Post = Backbone.Model.extend({
  idAttribute: 'postId',
  urlRoot: '/posts',
  initialize: function () {
    this.comments = new Comments([], {
      post: this
    });
  }
});

module.exports = Post;