define([
    'backbone.marionette',
    './comments-view',
    '../collections/comments',
    '../models/comment',
    'hbs!tmpl/post-full-view'
  ],
  function (Marionette, CommentsView, Comments, CommentModel, PostFullViewTmpl) {
    'use strict';

    return Marionette.ItemView.extend({

      initialize: function () {
        console.log("initialize a PostFullView ItemView");
      },

      template: PostFullViewTmpl,


      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      /* on render callback */
      onBeforeRender: function () {
        var post = this.model,
          model = post.toJSON();

        model.pubDate = new Date(Date.parse(model.pubDate)).toDateString();
      },

      onRender: function () {
        this.model.comments.fetch();

        var commentsView = new CommentsView({
          collection: this.model.comments,
          post: this.model
        });
        commentsView.render();

        App.root.getRegion('comments').show(commentsView);
      }
    });

  });