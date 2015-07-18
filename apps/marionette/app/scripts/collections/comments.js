define([
  'backbone',
  '../models/comment'
], function (Backbone, Comment) {
  'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function (options) {
      console.log("initialize a Comments collection");
      this.post = options.post;
    },

    model: Comment,

    url: function () {
      return this.post.url() + '/comments';
    }

  });
});