var
  Backbone = window.Backbone,
  Comments = require('./comments'),
  Post = Backbone.Model.extend({
    idAttribute: 'postId',
    urlRoot: '/posts',
    initialize: function () {
      this.comments = new Comments([], {
        post: this
      });
    }
  });

module.exports = Post;