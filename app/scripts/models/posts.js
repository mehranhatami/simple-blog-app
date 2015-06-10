define([
  'models/comments'
], function (Comments) {

  blog.models.Post = Backbone.Model.extend({
    idAttribute: 'postId',
    urlRoot: "/posts",
    initialize: function () {
      this.comments = new Comments([], {
        post: this
      });
    }
  });

  blog.models.Posts = Backbone.Collection.extend({
    model: blog.models.Post,
    url: '/posts'
  });

  return blog.models.Posts;
});