var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  blog = window.blog,
  Post = require('../models/post'),
  PostRouter = require('../routers/postRouter'),
  PostFormView = Backbone.View.extend({
    tagName: 'form',

    template: Handlebars.compile($('#postFormView').html()),

    initialize: function (options) {
      this.posts = options.posts;
    },

    events: {
      'click button': 'createPost',
      'click a': 'handleClick'
    },

    render: function () {
      this.el.innerHTML = this.template();
      return this;
    },

    createPost: function () {
      var postAttrs = {
        postId: this.posts.length,
        content: $('#postText').val(),
        title: $('#postTitle').val(),
        pubDate: new Date()
      };

      var post = new Post(postAttrs);
      //this.posts.add(post);
      //post.save();

      this.posts.create(postAttrs);

      PostRouter.instance.navigate('/', {
        trigger: true
      });

      return false;
    },
    handleClick: function (e) {
      e.preventDefault();
      PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
        trigger: true
      });
    }
  });

module.exports = PostFormView;