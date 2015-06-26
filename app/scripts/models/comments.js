define([
  'models/comment'
], function (Comment) {
  var Backbone = window.Backbone;

  return Backbone.Collection.extend({
    model: Comment,
    initialize: function (models, options) {
      this.post = options.post;
    },
    url: function () {
      return this.post.url() + "/comments";
    }
  });
});