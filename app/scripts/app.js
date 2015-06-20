var Posts = require('./models/posts'),
  PostsListView = require('./views/postsListView'),
  PostListView = require('./views/postListView'),
  PostRouter = require('./routers/postRouter'),
  blog = window.blog,
  Backbone = window.Backbone;

var app = {
  lunch: function () {

    var posts = new Posts(blog.data);

    var postRouter = PostRouter({
      posts: posts,
      main: $("#main")
    });

    // expose the router instance to the global world!
    // blog.postRouter = postRouter;

    Backbone.history.start({
      pushState: true
    });
  }
  // _lunch: function () {

  //   $("#main").append(new PostsListView({
  //     collection: new Posts(blog.data)
  //   }).render().el);

  // }
};

module.exports = app;