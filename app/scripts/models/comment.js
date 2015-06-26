define(function () {
  var Backbone = window.Backbone;

  return Backbone.Model.extend({
    idAttribute: 'commentId'
  });
});