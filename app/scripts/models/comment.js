var
  Backbone = require('backbone');

var Comment = Backbone.Model.extend({
  idAttribute: 'commentId'
});

module.exports = Comment;