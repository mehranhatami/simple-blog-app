var
  $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('handlebars'),
  Post = require('../models/post');

var PostFormView = Backbone.View.extend({
  tagName: 'form',
  router: null,
  template: Handlebars.compile($('#postFormView').html()),

  events: {
    'click button': 'createPost'
  },

  initialize: function (options) {
    this.posts = options.posts;
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

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

    //Alternative solution for this.posts.create(...)
    //this.posts.add(post);
    //post.save();

    this.posts.create(postAttrs);

    this.navigate('/', {
      trigger: true
    });

    return false;
  }
});

module.exports = PostFormView;