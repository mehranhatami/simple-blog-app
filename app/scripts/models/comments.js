define(function () {
  
  blog.models.Comment = Backbone.Model.extend({
    idAttribute: 'commentId',
    // urlRoot: "/posts"
  });

  blog.models.Comments = Backbone.Collection.extend({
    initialize: function (models, options) {
      this.post = options.post;
    },
    url: function () {
      return this.post.url() + "/comments";
    }
  });

  return blog.models.Comments;
});