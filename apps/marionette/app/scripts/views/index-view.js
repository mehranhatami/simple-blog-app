define([
    'backbone.marionette',
    'collections/posts',
    'views/posts-view',
    'hbs!tmpl/index-view'
  ],

  function (Marionette, Posts, PostsView, IndexViewTmpl) {
    'use strict';

    return Marionette.LayoutView.extend({
      initialize: function (options) {
        console.log("initialize a IndexView Layout");

        this.posts = options.posts;

        this.postsView = new PostsView({
          collection: this.posts
        });
      },

      template: IndexViewTmpl,

      regions: {
        header: "#header",
        content: "#content"
      },

      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      childEvents: {
        render: function (childView) {
          console.log("a childView has been rendered");
        }
      },

      /* on render callback */
      onRender: function () {
        this.getRegion('content').show(this.postsView);
      }
    });
  });