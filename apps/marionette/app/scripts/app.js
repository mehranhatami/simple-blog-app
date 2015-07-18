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

    /* Add initializers here */
    App.addInitializer(function () {
      //Backbone.history.start();
      Communicator.mediator.trigger("APP:START");
    });

    App.addInitializer(function (options) {
      App.root = new IndexView(options);
      App.container.show(App.root);

      options.root = App.root;

      App.postRouter = new PostRouter(options);
      App.postRouter.navigate('/', {
        trigger: true
      });
      // Backbone.history.start();
      // Backbone.history.start();
      // Communicator.mediator.trigger("APP:START");
    });



    return App;
  });