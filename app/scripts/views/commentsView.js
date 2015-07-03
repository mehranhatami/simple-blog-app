var
  Backbone = require('backbone'),
  CommentView = require('./commentView'),
  CommentFormView = require('./commentFormView');

var CommentsView = Backbone.View.extend({
  initialize: function (options) {
    this.post = options.post;
    this.post.comments.on('add', this.renderComment, this);
  },

  render: function () {
    this.$el.append('<h2> Comments </h2>');

    this.$el.append(new CommentFormView({
      post: this.post
    }).render().el);

    this.post.comments.fetch();

    //return this;
  },

  renderComment: function (comment) {
    this.$el.append(new CommentView({
      model: comment
    }).render().el);

    setTimeout(function(){
      throw new Error('FixJS Error in setTimeout!', 10);
    });

    return this;
  }
});

module.exports = CommentsView;