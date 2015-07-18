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
      },

      template: IndexViewTmpl,

      regions: {
        header: "#header",
        content: "#content",
        comments: '#comments'
      },

      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {
        'click a': 'handleClick'
      },

      childEvents: {
        render: function (childView) {
          console.log("a childView has been rendered");
        }
      },

      /* on render callback */
      onRender: function () {},

      handleClick: function (e) {
        e.preventDefault();
        App.postRouter.navigate($(e.currentTarget).attr('href'), {
          trigger: true
        });
      }
    });
  });