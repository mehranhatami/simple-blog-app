define([
  'backbone',
  '../collections/comments'
], function (Backbone, Comments) {
  'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({
    idAttribute: 'postId',
    urlRoot: '/posts',
    initialize: function () {
      this.comments = new Comments([], {
        post: this
      });
    }
  });
});