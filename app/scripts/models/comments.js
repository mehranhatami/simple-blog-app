var
  Backbone = require('backbone'),
  Comment = require('./comment');

var Comments = Backbone.Collection.extend({
  model: Comment,
  initialize: function (models, options) {
    this.post = options.post;
  },
  url: function () {
    return this.post.url() + '/comments';
  }
});

module.exports = Comments;