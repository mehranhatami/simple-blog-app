define([
  'models/comments'
], function (Comments) {
  var Backbone = window.Backbone;

  return Backbone.Model.extend({
    idAttribute: 'postId',
    urlRoot: "/posts",
    initialize: function () {
      this.comments = new Comments([], {
        post: this
      });
    }
  });
});