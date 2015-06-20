var
  Backbone = window.Backbone,
  PostsListView = require('../views/postsListView'),
  PostView = require('../views/postView'),
  PostFormView = require('../views/postFormView'),
  CommentsView = require('../views/commentsView'),
  blog = window.blog;
debugger;
var PostRouter = Backbone.Router.extend({
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

    // global shortcut
    blog.currentView = this.postsListView;
  },
  singlePost: function (id) {
    var post = this.posts.get(id);

    this.postView = new PostView({
      model: post
    });

    this.main.html(this.postView.render().el);

    //this.singlePostComments(post);

    // global shortcut
    blog.currentView = this.postView;
  },
  singlePostComments: function (post) {

    this.commentsView = new CommentsView({
      post: post
    });

    this.comments.html(this.commentsView.render().el);

    // global shortcut
    blog.commentsView = this.commentsView;
  },
  newPost: function () {
    this.postFormView = new PostFormView({
      posts: this.posts
    });
    this.main.html(this.postFormView.render().el);

    // global shortcut
    blog.currentView = this.postFormView;
  }
});

module.exports = function instantiate(options) {
  var postRouter = new PostRouter(options);

  // arguments.callee.instance = postRouter;
  instantiate.instance = postRouter;
  return postRouter;
};