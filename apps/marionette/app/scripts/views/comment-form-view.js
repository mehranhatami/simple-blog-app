define([
  'backbone.marionette',
  'communicator',
  '../models/post',
  'hbs!tmpl/comment-form-view'
], function (Marionette, Communicator, Post, CommentFormViewTmpl) {
  'use strict';

  /* Return a ItemView class definition */
  return Marionette.ItemView.extend({

    initialize: function (options) {
      console.log("initialize a PostFormView ItemView");
      this.post = options.post;
    },
    tagName: 'form',
    template: CommentFormViewTmpl,


    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click button': 'submitComment'
    },

    /* on render callback */
    onRender: function () {},

    submitComment: function (e) {
      e.preventDefault();
      var name = this.$('#cmtName').val(),
        text = this.$('#cmtText').val(),
        commentAttrs = {
          postId: this.post.get('postId'),
          name: name,
          text: text,
          date: new Date()
        };

      this.post.comments.create(commentAttrs);

      Communicator.mediator.trigger('COMMENT:CREATED', this.post, commentAttrs);

      this.el.reset();


      return false;
    }
  });

});