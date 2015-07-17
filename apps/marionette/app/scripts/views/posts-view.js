define([
  'backbone.marionette',
  'views/post-view',
  'hbs!tmpl/posts-view'
], function (Marionette, PostView, PostsViewTmpl) {
  'use strict';

  /* Return a CompositeView class definition */
  return Marionette.CompositeView.extend({

    initialize: function () {
      console.log('initialize a PostsView CompositeView');
    },

    childView: PostView,

    childViewContainer: 'ul',

    template: PostsViewTmpl,


    /* ui selector cache */
    ui: {},

    /* where are we appending the items views */
    //itemViewContainer: '',

    /* Ui events hash */
    events: {}

    // appendHtml: function (collectionView, itemView) {
    //   collectionView.$("tbody").append(itemView.el);
    // }
  });

});