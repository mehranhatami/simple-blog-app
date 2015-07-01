var
  $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('handlebars');

var CommentFormView = Backbone.View.extend({
  tagName: 'form',

  initialize: function (options) {
    this.post = options.post;
  },

  template: Handlebars.compile($('#commentFormView').html()),

  events: {
    'click button': 'submitComment'
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

  submitComment: function (e) {
    var name = this.$('#cmtName').val(),
      text = this.$('#cmtText').val(),
      commentAttrs = {
        postId: this.post.get('postId'),
        name: name,
        text: text,
        date: new Date()
      };

    this.post.comments.create(commentAttrs);
    
    this.el.reset();

    e.preventDefault();
    return false;
  }

});

module.exports = CommentFormView;