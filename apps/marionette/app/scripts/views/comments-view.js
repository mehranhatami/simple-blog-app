define([
    'backbone.marionette',
    'views/item/comment-view',
    'hbs!tmpl/comments-view'
  ],
  function (Marionette, CommentView, CommentsViewTmpl) {
    'use strict';

    /* Return a CompositeView class definition */
    return Marionette.CompositeView.extend({

      initialize: function () {
        console.log("initialize a CommentsView CompositeView");
      },

      childView: CommentView,

      childViewContainer: 'ul',

      template: CommentsViewTmpl,


      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      /* on render callback */
      onRender: function () {}
    });

  });