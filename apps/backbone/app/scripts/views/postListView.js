var
  Backbone = require('backbone'),
  Handlebars = require('handlebars'),
  BaseView = require('./baseView'),
  utils = require('../utils');

var PostListView = utils.extend(BaseView, {
  tagName: 'li',

  initialize: function (options) {
    this.model = options.model;
  },

  events: {},

  template: Handlebars.compile('<a href="/posts/{{postId}}">{{title}}</a>'),

  compile: function () {
    return this.template(this.model.toJSON());
  },

  render: function () {
    this.$el.html(this.compile());
    return this;
  }
});

module.exports = PostListView;