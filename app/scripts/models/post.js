var
  Backbone = window.Backbone,
  Comments = require('./comments');

module.exports = Backbone.Model.extend({
  idAttribute: 'postId',
  urlRoot: '/posts',
  initialize: function () {
    this.comments = new Comments([], {
      post: this
    });
  }
});