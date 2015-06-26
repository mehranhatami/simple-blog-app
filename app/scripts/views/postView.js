define([
  'views/commentsView'
], function (CommentsView) {
  var Backbone = window.Backbone,
    Handlebars = window.Handlebars;

  return Backbone.View.extend({

    template: Handlebars.compile($("#postView").html()),

    events: {
      'click a': 'handleClick'
    },

    render: function () {
      var post = this.model,
        model = post.toJSON();

      model.pubDate = new Date(Date.parse(model.pubDate)).toDateString();
      this.el.innerHTML = this.template(model);

      var commentsView = new CommentsView({
        post: post
      });

      this.$el.find('>.comments').html(commentsView.render().el);

      return this;
    },

    handleClick: function (e) {
      var PostRouter = window.PostRouter;
      e.preventDefault();
      PostRouter.instance.navigate($(e.currentTarget).attr("href"), {
        trigger: true
      });
      return false;
    }
  });
});