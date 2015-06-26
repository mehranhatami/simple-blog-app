var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  PostListView = require('./postListView');

module.exports = Backbone.View.extend({
  events: {
    'click a': 'handleClick'
  },
  template: Handlebars.compile($('#index').html()),
  render: function () {
    this.el.innerHTML = this.template();
    var ul = this.$el.find('ul');
    this.collection.forEach(function (post) {
      ul.append(new PostListView({
        model: post
      }).render().el);
    });
    return this;
  },

  handleClick: function (e) {
    var PostRouter = require('../routers/postRouter');
    e.preventDefault();
    PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
      trigger: true
    });
  }
});