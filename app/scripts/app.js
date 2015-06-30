var
  $ = require('jquery'),
  Backbone = require('backbone'),
  Posts = require('./models/posts'),
  PostsListView = require('./views/postsListView'),
  PostListView = require('./views/postListView'),
  PostRouter = require('./routers/postRouter');

var app = {
  lunch: function () {
    $.getJSON('/posts')
      .then(app.load)
      .fail(function (error) {
        console.error('Something wrong with the database!', error);
      });
  },
  load: function (data) {
    var posts = new Posts(data),
      postRouter = PostRouter({
        posts: posts,
        main: $("#main")
      });

    Backbone.history.start({
      pushState: true
    });

    // Getting ride of handleClick
    // $("#main a").click(function (e) {});
    $("#main").on('click', 'a', function (e) {
      e.preventDefault();
      postRouter.navigate($(e.currentTarget).attr('href'), {
        trigger: true
      });
    });
  }
};

module.exports = app;