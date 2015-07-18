define([
  'backbone',
  '../views/post-view',
  '../views/post-full-view',
  '../views/post-form-view',
  '../views/comments-view',
  '../views/posts-view'
], function (Backbone, PostView, PostFullView, PostFormView, CommentsView, PostsView) {
  'use strict';

  var PostRouter = Backbone.Router.extend({
    initialize: function (options) {
      this.posts = options.posts;
      this.root = options.root;
    },
    routes: {
      '': 'index',
      'posts/new': 'newPost',
      'posts/:id': 'singlePost'
    },
    index: function () {
      this.postsView = new PostsView({
        collection: this.posts
      });
      this.root.getRegion('content').show(this.postsView);
    },
    singlePost: function (id) {
      var post = this.posts.get(id);

      this.postFullView = new PostFullView({
        model: post
      });

      this.root.getRegion('content').show(this.postFullView);
    },
    newPost: function () {
      this.postFormView = new PostFormView({
        posts: this.posts
      });

      this.root.getRegion('content').show(this.postFormView);
    }
  });

  PostRouter.new = function instantiate(options) {
    var postRouter = new PostRouter(options);

    // arguments.callee.instance = postRouter;
    instantiate.instance = postRouter;
    return postRouter;
  };

  return PostRouter;
});