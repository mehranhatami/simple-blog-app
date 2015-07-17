define([
  'backbone',
  'models/comment'
], function (Backbone, Comment) {
  'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function () {
      console.log("initialize a Comments collection");
    },

    model: Comment

  });
});