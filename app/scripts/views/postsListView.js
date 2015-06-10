define([
  'views/postListView'
], function () {

  blog.views.PostsListView = Backbone.View.extend({
    events: {
      'click a': 'handleClick'
    },
    template: Handlebars.compile($("#index").html()),
    render: function () {
      this.el.innerHTML = this.template();
      var ul = this.$el.find("ul");
      this.collection.forEach(function (post) {
        ul.append(new blog.views.PostListView({
          model: post
        }).render().el);
      });
      return this;
    },
    handleClick: function (e) {
      e.preventDefault();
      blog.postRouter.navigate($(e.currentTarget).attr("href"), {
        trigger: true
      });
    }
  });

  return blog.views.PostsListView;
});