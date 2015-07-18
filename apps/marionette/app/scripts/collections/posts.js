define([
  'backbone',
  '../models/post'
], function (Backbone, Post) {
  'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });
});