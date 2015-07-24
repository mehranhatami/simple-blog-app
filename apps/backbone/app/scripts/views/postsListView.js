var
  $ = require('jquery'),
  _ = require('lodash'),
  Backbone = require('backbone'),
  Handlebars = require('handlebars'),
  PostListView = require('./postListView'),
  BaseView = require('./baseView'),
  utils = require('../utils');

var PostsListView = utils.extend(BaseView, {
  events: {},
  template: Handlebars.compile($('#index').html()),
  render: function () {
    this.$el.html(this.template());


    var ul = this.$el.find('ul');
    
    // this.collection.forEach(function (post) {
    //   ul.append(new PostListView({
    //     model: post
    //   }).render().el);
    // });

    //using lodash
    _(this.collection.models)
      .map(function (post, index) {
        return new PostListView({
          model: post
        }).render().el;
      })
      .each(function(postView){
        ul.append(postView);
      })
      .value();

    // Another approach
    // var htmlStr = '';
    // this.collection.forEach(function (post) {
    //   htmlStr += new PostListView({
    //     model: post
    //   }).compile();
    // });
    // this.$el.find('ul').html(htmlStr);

    ul = undefined;

    return this;
  }
});

module.exports = PostsListView;