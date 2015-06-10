define([
  'views/postsListView',
  'views/postView',
  'views/postFormView'
], function (PostsListView, PostView, PostFormView, CommentsView) {

  blog.routers.PostRouter = Backbone.Router.extend({
    initialize: function (options) {
      this.posts = options.posts;
      this.main = options.main;
    },
    routes: {
      '': 'index',
      'posts/new': 'newPost',
      'posts/:id': 'singlePost'
    },
    index: function () {

      this.postsListView = new PostsListView({
        collection: this.posts
      });

      this.main.html(this.postsListView.render().el);

      blog.currentView = this.postsListView;
    },
    singlePost: function (id) {
      var post = this.posts.get(id);

      this.postView = new PostView({
        model: post
      });

      this.main.html(this.postView.render().el);

      //this.singlePostComments(post);

      blog.currentView = this.postView;
    },
    singlePostComments: function(post){

      this.commentsView = new CommentsView({
        post: post
      });

      this.comments.html(this.commentsView.render().el);

      blog.commentsView = this.commentsView;
    },
    newPost: function () {
      this.postFormView = new PostFormView({
        posts: this.posts
      });
      this.main.html(this.postFormView.render().el);

      blog.currentView = this.postFormView;
    }
  });

  return blog.routers.PostRouter;

});