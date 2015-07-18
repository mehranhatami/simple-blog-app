define([
    'backbone.marionette',
    'views/comment-view',
    'views/comment-form-view',
    'hbs!tmpl/comments-view'
  ],
  function (Marionette, CommentView, CommentFormView, CommentsViewTmpl) {
    'use strict';

    /* Return a CompositeView class definition */
    return Marionette.CompositeView.extend({

      initialize: function (options) {
        console.log("initialize a CommentsView CompositeView");
        this.post = options.post;
      },

      childView: CommentView,

      childViewContainer: 'ul',

      template: CommentsViewTmpl,

      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      childEvents: {
        render: function (childView) {
          console.log("a childView has been rendered");
        }
      },

      onRender: function () {

        var commentFormView = new CommentFormView({
          post: this.post
        });
        commentFormView.render();

        this.$('#commentForm').append(commentFormView.el);

      }
    });

  });