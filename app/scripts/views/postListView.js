var
  Backbone = require('backbone'),
  Handlebars = require('handlebars');

var PostListView = Backbone.View.extend({
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