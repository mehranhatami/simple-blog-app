define([
    'backbone',
    'backbone.marionette',
    'communicator',
    'routers/post-router',
    'views/index-view'
  ],

  function (Backbone, Marionette, Communicator, PostRouter, IndexView) {
    'use strict';

    var App = new Marionette.Application();

    /* Add application regions here */
    App.addRegions({
      container: "#container"
    });

    App.addInitializer(function (options) {
      App.root = new IndexView(options);
      App.container.show(App.root);

      options.root = App.root;

      App.postRouter = new PostRouter(options);

      Backbone.history.start();

      Communicator.mediator.trigger('APP:START');
    });



    return App;
  });