define([
  'models/posts',
  'views/postsListView',
  'views/postListView',
  'routers/postRouter'
], function () {

  var app = {
    lunch: function () {

      blog.posts = new blog.models.Posts(blog.data);

      blog.postRouter = new blog.routers.PostRouter({
        posts: blog.posts,
        main: $("#main")
      });

      Backbone.history.start({
        pushState: true
      });

    },
    _lunch: function(){
      
      $("#main").append(new blog.views.PostsListView({
        collection: new blog.models.Posts(blog.data)
      }).render().el);

    }
  };

  return app;

});