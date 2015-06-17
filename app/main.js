(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Posts = require('./models/posts'),
  PostsListView = require('./views/postsListView'),
  PostListView = require('./views/postListView'),
  PostRouter = require('./routers/postRouter'),
  blog = window.blog,
  Backbone = window.Backbone;

var app = {
  lunch: function () {

    var posts = new Posts(blog.data);

    var postRouter = PostRouter({
      posts: posts,
      main: $("#main")
    });

    // expose the router instance to the global world!
    // blog.postRouter = postRouter;

    Backbone.history.start({
      pushState: true
    });
  },
  _lunch: function () {

    $("#main").append(new PostsListView({
      collection: new Posts(blog.data)
    }).render().el);

  }
};

module.exports = app;
},{"./models/posts":6,"./routers/postRouter":7,"./views/postListView":12,"./views/postsListView":14}],2:[function(require,module,exports){
// require.config({
//   baseUrl: "/scripts"
// });

var app = require('./app');

$(app.lunch);
},{"./app":1}],3:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Comment = Backbone.Model.extend({
    idAttribute: 'commentId'
  });

module.exports = Comment;
},{}],4:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Comment = require('./comment'),
  Comments = Backbone.Collection.extend({
    initialize: function (models, options) {
      this.post = options.post;
    },
    url: function () {
      return this.post.url() + '/comments';
    }
  });

module.exports = Comments;
},{"./comment":3}],5:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Comments = require('./comments'),
  Post = Backbone.Model.extend({
    idAttribute: 'postId',
    urlRoot: '/posts',
    initialize: function () {
      this.comments = new Comments([], {
        post: this
      });
    }
  });

module.exports = Post;
},{"./comments":4}],6:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Post = require('./post'),
  Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });

module.exports = Posts;
},{"./post":5}],7:[function(require,module,exports){
var
  Backbone = window.Backbone,
  PostsListView = require('../views/postsListView'),
  PostView = require('../views/postView'),
  PostFormView = require('../views/postFormView'),
  CommentsView = require('../views/commentsView'),
  blog = window.blog;

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

    this.postsListView = new PostsListView({
      collection: this.posts
    });

    this.main.html(this.postsListView.render().el);

    // global shortcut
    blog.currentView = this.postsListView;
  },
  singlePost: function (id) {
    var post = this.posts.get(id);

    this.postView = new PostView({
      model: post
    });

    this.main.html(this.postView.render().el);

    //this.singlePostComments(post);

    // global shortcut
    blog.currentView = this.postView;
  },
  singlePostComments: function (post) {

    this.commentsView = new CommentsView({
      post: post
    });

    this.comments.html(this.commentsView.render().el);

    // global shortcut
    blog.commentsView = this.commentsView;
  },
  newPost: function () {
    this.postFormView = new PostFormView({
      posts: this.posts
    });
    this.main.html(this.postFormView.render().el);

    // global shortcut
    blog.currentView = this.postFormView;
  }
});

function instantiate(options) {
  var postRouter = new PostRouter(options);

  // arguments.callee.postRouter = postRouter;
  instantiate.instance = postRouter;
  return postRouter;
}

module.exports = instantiate;
},{"../views/commentsView":10,"../views/postFormView":11,"../views/postView":13,"../views/postsListView":14}],8:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  CommentFormView = Backbone.View.extend({
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
      var name = this.$('#cmtName').val();
      var text = this.$('#cmtText').val();
      var commentAttrs = {
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

module.exports = CommentFormView;
},{}],9:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  CommentView = Backbone.View.extend({

    template: Handlebars.compile($('#commentView').html()),

    render: function () {
      var model = this.model.toJSON();

      model.date = new Date(Date.parse(model.date)).toDateString();

      this.el.innerHTML = this.template(model);

      return this;
    }
  });

module.exports = CommentView;
},{}],10:[function(require,module,exports){
var
  Backbone = window.Backbone,
  CommentView = require('./commentView'),
  CommentFormView = require('./commentFormView'),
  CommentsView = Backbone.View.extend({
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

module.exports = CommentsView;
},{"./commentFormView":8,"./commentView":9}],11:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  blog = window.blog,
  Post = require('../models/post'),
  PostRouter = require('../routers/postRouter'),
  PostFormView = Backbone.View.extend({
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

    createPost: function () {
      var postAttrs = {
        postId: this.posts.length,
        content: $('#postText').val(),
        title: $('#postTitle').val(),
        pubDate: new Date()
      };

      var post = new Post(postAttrs);
      //this.posts.add(post);
      //post.save();

      this.posts.create(postAttrs);

      PostRouter.instance.navigate('/', {
        trigger: true
      });

      return false;
    },
    handleClick: function (e) {
      e.preventDefault();
      PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
        trigger: true
      });
    }
  });

module.exports = PostFormView;
},{"../models/post":5,"../routers/postRouter":7}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  blog = window.blog,
  CommentsView = require('./commentsView'),
  PostRouter = require('../routers/postRouter'),
  PostView = Backbone.View.extend({

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
      e.preventDefault();
      PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
        trigger: true
      });
      return false;
    }
  });

module.exports = PostView;
},{"../routers/postRouter":7,"./commentsView":10}],14:[function(require,module,exports){
var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars,
  blog = window.blog,
  PostListView = require('./postListView'),
  PostRouter = require('../routers/postRouter'),
  PostsListView = Backbone.View.extend({
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
      e.preventDefault();
      PostRouter.instance.navigate($(e.currentTarget).attr('href'), {
        trigger: true
      });
    }
  });

module.exports = PostsListView;
},{"../routers/postRouter":7,"./postListView":12}]},{},[2,1,3,4,5,6,7,8,9,10,11,12,13,14]);
