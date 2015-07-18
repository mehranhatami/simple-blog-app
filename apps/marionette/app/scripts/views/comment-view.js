define([
  'backbone',
  'hbs!tmpl/comment-view'
], function (Backbone, CommentViewTmpl) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function () {
      console.log("initialize a CommentView ItemView");
    },
    tagName: 'li',
    template: CommentViewTmpl,


    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {},

    /* on render callback */
    onRender: function () {
      var model = this.model.toJSON(),
        date = new Date(Date.parse(model.date)).toDateString();
      this.model.set('date', date);
    }
  });

});