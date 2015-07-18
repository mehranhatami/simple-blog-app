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
      console.log(25, 'this.model.title:', this.model.get('title'));
    }
  });

});