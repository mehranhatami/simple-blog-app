define([
  'backbone.marionette',
  'communicator',
  '../models/post',
  'hbs!tmpl/post-form-view'
], function (Marionette, Communicator, Post, PostFormViewTmpl) {
  'use strict';

  /* Return a ItemView class definition */
  return Marionette.ItemView.extend({

    initialize: function (options) {
      console.log("initialize a PostFormView ItemView");
      this.posts = options.posts;
    },
    tagName: 'form',
    template: PostFormViewTmpl,


    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click button': 'createPost'
    },

    /* on render callback */
    onRender: function () {},

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

      Communicator.mediator.trigger('POST:CREATED');

      App.postRouter.navigate('/', {
        trigger: true
      });

      return false;
    }
  });

});