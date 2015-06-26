define([
  'models/post'
], function (Post) {
  var Backbone = window.Backbone;
  
  return Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });
});