var
  Backbone = require('backbone'),
  _ = require('lodash');

var utils = {
  extend: function (Base, options) {
    var View = Backbone.View.extend.apply(Base, _.rest(arguments));
    View.prototype.events = _.extend({}, Base.prototype.events, options.events);
    View.prototype.childViews = [];
    return View;
  },
  dispose: function (baseView) {
    _.each(baseView.childViews, function (childView) {
      childView.dispose(true);
    });

    baseView.childViews = [];
  }
};

module.exports = utils;