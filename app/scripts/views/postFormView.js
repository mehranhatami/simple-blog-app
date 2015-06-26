var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  Post = require('../models/post');

module.exports = Backbone.View.extend({
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

  router: null,
  navigate: function (url, options) {
    if (!this.router) {
      this.router = require('../routers/postRouter');
    }
    this.router.instance.navigate(url, options);
  },

  createPost: function () {
    var postAttrs = {
        postId: this.posts.length,
        content: $('#postText').val(),
        title: $('#postTitle').val(),
        pubDate: new Date()
      },
      post = new Post(postAttrs);

    //this.posts.add(post);
    //post.save();

    this.posts.create(postAttrs);

    this.navigate('/', {
      trigger: true
    });

    return false;
  },
  handleClick: function (e) {
    e.preventDefault();
    this.navigate($(e.currentTarget).attr('href'), {
      trigger: true
    });
  }
});