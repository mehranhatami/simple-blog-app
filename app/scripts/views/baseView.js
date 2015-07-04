var
  _ = require('lodash'),
  Backbone = require('backbone'),
  utils = require('../utils');

var BaseView = Backbone.View.extend({
  events: {},

  dispose: function (notToRemove) {
    
    this.unbind();

    if (_.isObject(this.model) && _.isFunction(this.render)) {
      // Unbind reference to the model
      this.model.unbind('change', this.render, this);
    }
    // Unbind reference to the parent view
    // check for the parent view and unbind the relevant events
    // and remove the current view from the chain
    // this.parent.unbind( 'close:all', this.close, this);

    // When we remove the parent view this way we could ask the child views:
    // not to call remove because it is already removed
    if (!notToRemove) {
      // Remove this view
      this.remove();
    }
    // Remove view from DOM
    // Remove child views if exists
    utils.dispose(this);

    // Object.key(this);//['el', '$el', ...]

    this.el = undefined;
    this.$el = undefined;

    // Delete the jQuery wrapped object variable
    // delete this.$el;
    // delete this.el;
  }
});

module.exports = BaseView;