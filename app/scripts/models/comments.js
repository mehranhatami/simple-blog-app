var
  Backbone = window.Backbone,
  Comment = require('./comment'),
  Comments = Backbone.Collection.extend({
    initialize: function (models, options) {
      this.post = options.post;
    },
    url: function () {
      return this.post.url() + '/comments';
    }
  });

module.exports = Comments;