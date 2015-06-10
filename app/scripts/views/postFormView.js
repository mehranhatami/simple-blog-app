define(function () {

  blog.views.PostFormView = Backbone.View.extend({
    tagName: 'form',

    template: Handlebars.compile($("#postFormView").html()),

    initialize: function (options) {
      this.posts = options.posts;
    },

    events: {
      'click button': 'createPost'
    },

    render: function () {
      this.el.innerHTML = this.template();
      return this;
    },

    createPost: function () {
      var postAttrs = {
        postId: this.posts.length,
        content: $("#postText").val(),
        title: $("#postTitle").val(),
        pubDate: new Date()
      };

      var post = new blog.models.Post(postAttrs);
      //this.posts.add(post);
      //post.save();

      this.posts.create(postAttrs);

      blog.postRouter.navigate("/", {
        trigger: true
      });

      return false;
    }
  });

  return blog.views.PostFormView;

});