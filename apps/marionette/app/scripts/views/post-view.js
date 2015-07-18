define([
  'backbone.marionette',
  'hbs!tmpl/post-view'
], function (Marionette, PostViewTmpl) {
  'use strict';

  /* Return a ItemView class definition */
  return Marionette.ItemView.extend({

    initialize: function () {
      console.log("initialize a PostView ItemView");
    },
    tagName: 'li',
    template: PostViewTmpl,


    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {},

    /* on render callback */
    onRender: function () {
      console.log(25, 'this.model:', this.model.get('name'));


    },

    oldRender: function () {
      var post = this.model,
        model = post.toJSON();

      model.pubDate = new Date(Date.parse(model.pubDate)).toDateString();

      this.root.getRegion('content').show(this);

      var commentsView = new CommentsView({
        post: post
      });

      App.root.getRegion('comments').show(commentsView);
    }
  });

});