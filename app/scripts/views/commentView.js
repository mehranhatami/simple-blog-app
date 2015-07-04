var
  $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('handlebars'),
  BaseView = require('./baseView'),
  utils = require('../utils');

var CommentView = utils.extend(BaseView, {

  template: Handlebars.compile($('#commentView').html()),

  render: function () {
    var model = this.model.toJSON();

    model.date = new Date(Date.parse(model.date)).toDateString();

    this.$el.html(this.template(model));

    return this;
  }
});

module.exports = CommentView;