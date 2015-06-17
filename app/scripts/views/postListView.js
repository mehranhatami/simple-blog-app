var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  //PostRouter = require('../routers/postRouter'),
  PostListView = Backbone.View.extend({
    tagName: 'li',

    // events: {
    //   'click a': 'handleClick'
    // },

    template: Handlebars.compile('<a href="/posts/{{postId}}">{{title}}</a>'),

    render: function () {
      this.el.innerHTML = this.template(this.model.toJSON());
      return this;
    }

    // handleClick: function (e) {

    //   e.preventDefault();

    //   PostRouter.instance.navigate($(e.currentTarget).attr("href"), {
    //     trigger: true
    //   });

    // }
  });

module.exports = PostListView;