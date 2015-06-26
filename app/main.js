(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Posts = require('./models/posts'),
  PostsListView = require('./views/postsListView'),
  PostListView = require('./views/postListView'),
  PostRouter = require('./routers/postRouter');

var app = {
  lunch: function () {
    $.getJSON('/posts')
      .then(app.load)
      .fail(function (error) {
        console.error('Something wrong with the database!', error);
      });
  },
  load: function (data) {
    var posts = new Posts(data),
      postRouter = PostRouter({
        posts: posts,
        main: $("#main")
      });

    Backbone.history.start({
      pushState: true
    });

    // Getting ride of handleClick
    // $("#main").on('click', 'a', function (e) {
    //   e.preventDefault();
    //   postRouter.navigate($(e.currentTarget).attr('href'), {
    //     trigger: true
    //   });
    // });
  }
};

module.exports = app;
},{"./models/posts":6,"./routers/postRouter":7,"./views/postListView":12,"./views/postsListView":14}],2:[function(require,module,exports){
$(require('./app').lunch);
},{"./app":1}],3:[function(require,module,exports){
var
  Backbone = window.Backbone;

module.exports = Backbone.Model.extend({
  idAttribute: 'commentId'
});
},{}],4:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Comment = require('./comment');

module.exports = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.post = options.post;
  },
  url: function () {
    return this.post.url() + '/comments';
  }
});
},{"./comment":3}],5:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Comments = require('./comments');

module.exports = Backbone.Model.extend({
  idAttribute: 'postId',
  urlRoot: '/posts',
  initialize: function () {
    this.comments = new Comments([], {
      post: this
    });
  }
});
},{"./comments":4}],6:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Post = require('./post');

module.exports = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
});
},{"./post":5}],7:[function(require,module,exports){
var
  Backbone = window.Backbone,
  PostView = require('../views/postView'),
  PostFormView = require('../views/postFormView'),
  CommentsView = require('../views/commentsView');

var PostRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.posts = options.posts;
    this.main = options.main;
  },
  routes: {
    '': 'index',
    'posts/new': 'newPost',
    'posts/:id': 'singlePost'
  },
  index: function () {
    var PostsListView = require('../views/postsListView');

    this.postsListView = new PostsListView({
      collection: this.posts
    });

    this.main.html(this.postsListView.render().el);
  },
  singlePost: function (id) {
    var post = this.posts.get(id);

    this.postView = new PostView({
      model: post
    });

    this.main.html(this.postView.render().el);
  },
  newPost: function () {
    this.postFormView = new PostFormView({
      posts: this.posts
    });
    this.main.html(this.postFormView.render().el);
  }
});

module.exports = function instantiate(options) {
  var postRouter = new PostRouter(options);

  // arguments.callee.instance = postRouter;
  instantiate.instance = postRouter;
  return postRouter;
};
},{"../views/commentsView":10,"../views/postFormView":11,"../views/postView":13,"../views/postsListView":14}],8:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars;

module.exports = Backbone.View.extend({
  tagName: 'form',

  initialize: function (options) {
    this.post = options.post;
  },

  template: Handlebars.compile($('#commentFormView').html()),

  events: {
    'click button': 'submitComment'
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

  submitComment: function (e) {
    var name = this.$('#cmtName').val(),
      text = this.$('#cmtText').val(),
      commentAttrs = {
        postId: this.post.get('postId'),
        name: name,
        text: text,
        date: new Date()
      };

    this.post.comments.create(commentAttrs);
    this.el.reset();

    e.preventDefault();
    return false;
  }

});
},{}],9:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars;

module.exports = Backbone.View.extend({

  template: Handlebars.compile($('#commentView').html()),

  render: function () {
    var model = this.model.toJSON();

    model.date = new Date(Date.parse(model.date)).toDateString();

    this.el.innerHTML = this.template(model);

    return this;
  }
});
},{}],10:[function(require,module,exports){
var
  Backbone = window.Backbone,
  CommentView = require('./commentView'),
  CommentFormView = require('./commentFormView');

module.exports = Backbone.View.extend({
  initialize: function (options) {
    this.post = options.post;
    this.post.comments.on('add', this.renderComment, this);
  },

  render: function () {
    this.$el.append('<h2> Comments </h2>');

    this.$el.append(new CommentFormView({
      post: this.post
    }).render().el);

    this.post.comments.fetch();

    return this;
  },

  renderComment: function (comment) {
    this.$el.append(new CommentView({
      model: comment
    }).render().el);

    return this;
  }
});
},{"./commentFormView":8,"./commentView":9}],11:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  Post = require('../models/post');

module.exports = Backbone.View.extend({
  tagName: 'form',

  template: Handlebars.compile($('#postFormView').html()),

  initialize: function (options) {
    this.posts = options.posts;
  },

  events: {
    'click button': 'createPost',
    'click a': 'handleClick'
  },

  render: function () {
    this.el.innerHTML = this.template();
    return this;
  },

  router: null,
  navigate: function (url, options) {
    if (!this.router) {
      this.router = require('../routers/postRouter');
    }
    this.router.instance.navigate(url, options);
  },

  createPost: function () {
    var postAttrs = {
        postId: this.posts.length,
        content: $('#postText').val(),
        title: $('#postTitle').val(),
        pubDate: new Date()
      },
      post = new Post(postAttrs);

    //this.posts.add(post);
    //post.save();

    this.posts.create(postAttrs);

    this.navigate('/', {
      trigger: true
    });

    return false;
  },
  handleClick: function (e) {
    e.preventDefault();
    this.navigate($(e.currentTarget).attr('href'), {
      trigger: true
    });
  }
});
},{"../models/post":5,"../routers/postRouter":7}],12:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars;

module.exports = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click a': 'handleClick'
  },

  template: Handlebars.compile('<a href="/posts/{{postId}}">{{title}}</a>'),

  render: function () {
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },

  handleClick: function (e) {
    var PostRouter = require('../routers/postRouter');
    e.preventDefault();

    PostRouter.instance.navigate($(e.currentTarget).attr("href"), {
      trigger: true
    });
  }
});
},{"../routers/postRouter":7}],13:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  CommentsView = require('./commentsView');

module.exports = Backbone.View.extend({

  template: Handlebars.compile($('#postView').html()),

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
    var PostRouter = require('../routers/postRouter');
    e.preventDefault();
    PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
      trigger: true
    });
    return false;
  }
});
},{"../routers/postRouter":7,"./commentsView":10}],14:[function(require,module,exports){
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
},{"../routers/postRouter":7,"./postListView":12}]},{},[2]);
