var
  Backbone = window.Backbone,
  PostView = require('../views/postView'),
  PostFormView = require('../views/postFormView'),
  CommentsView = require('../views/commentsView');

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
    var PostsListView = require('../views/postsListView');

    this.postsListView = new PostsListView({
      collection: this.posts
    });

    this.main.html(this.postsListView.render().el);
  },
  singlePost: function (id) {
    var post = this.posts.get(id);

    this.postView = new PostView({
      model: post
    });

    this.main.html(this.postView.render().el);
  },
  newPost: function () {
    this.postFormView = new PostFormView({
      posts: this.posts
    });
    this.main.html(this.postFormView.render().el);
  }
});

module.exports = function instantiate(options) {
  var postRouter = new PostRouter(options);

  // arguments.callee.instance = postRouter;
  instantiate.instance = postRouter;
  return postRouter;
};