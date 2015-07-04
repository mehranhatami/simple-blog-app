var
  Backbone = require('backbone'),
  CommentView = require('./commentView'),
  CommentFormView = require('./commentFormView'),
  BaseView = require('./baseView'),
  utils = require('../utils');

var CommentsView = utils.extend(BaseView, {
  initialize: function (options) {
    this.post = options.post;
    this.post.comments.on('add', this.renderComment, this);
  },

  render: function () {
    this.$el.append('<h2> Comments </h2>');

    this.commentFormView = new CommentFormView({
      post: this.post
    });

    this.childViews.push(this.commentFormView);

    this.$el.append(this.commentFormView.render().el);

    this.post.comments.fetch();

    return this;
  },

  renderComment: function (comment) {
    var commentView = new CommentView({
      model: comment
    });

    this.childViews.push(commentView);

    this.$el.append(commentView.render().el);

    return this;
  }
});

module.exports = CommentsView;