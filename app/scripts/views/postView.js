var
  $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('handlebars'),
  CommentsView = require('./commentsView'),
  BaseView = require('./baseView'),
  utils = require('../utils');

var PostView = utils.extend(BaseView, {

  template: Handlebars.compile($('#postView').html()),

  events: {},

  render: function () {
    var post = this.model,
      model = post.toJSON();

    model.pubDate = new Date(Date.parse(model.pubDate)).toDateString();
    this.el.innerHTML = this.template(model);

    var commentsView = new CommentsView({
      post: post
    });

    this.childViews.push(commentsView);

    this.$el.find('>.comments').html(commentsView.render().el);

    return this;
  }
});

module.exports = PostView;