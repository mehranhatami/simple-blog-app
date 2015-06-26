define([
  'models/post'
], function (Post) {
  var Backbone = window.Backbone,
    Handlebars = window.Handlebars;

  return Backbone.View.extend({
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
        },
        post = new Post(postAttrs),
        PostRouter = window.PostRouter;

      //this.posts.add(post);
      //post.save();

      this.posts.create(postAttrs);

      PostRouter.instance.navigate('/', {
        trigger: true
      });

      return false;
    }
  });
});