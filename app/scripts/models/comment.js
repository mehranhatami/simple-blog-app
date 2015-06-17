var
  Backbone = window.Backbone,
  Comment = Backbone.Model.extend({
    idAttribute: 'commentId'
  });

module.exports = Comment;