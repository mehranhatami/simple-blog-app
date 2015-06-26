define([
  'models/posts',
  'routers/postRouter'
], function (Posts, PostRouter) {
  var Backbone = window.Backbone;

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

      //expose to global!!
      window.PostRouter = PostRouter;

      Backbone.history.start({
        pushState: true
      });

      // Getting ride of handleClick
      // $("#main").on('click', 'a', function (e) {
      //   e.preventDefault();
      //   postRouter.navigate($(e.currentTarget).attr('href'), {
      //     trigger: true
      //   });
      // });
    }
  };

  return app;
});