define([
    'backbone.marionette',
    'communicator',
    'routers/post-router',
    'views/index-view'
  ],

  function (Marionette, Communicator, PostRouter, IndexView) {
    'use strict';

    var App = new Marionette.Application();

    /* Add application regions here */
    App.addRegions({
      container: "#container"
    });

    /* Add initializers here */
    // App.addInitializer(function () {
    //   document.body.innerHTML = indexTmpl({
    //     success: "CONGRATS!"
    //   });
    //   Communicator.mediator.trigger("APP:START");
    // });

    App.addInitializer(function (options) {
      var indexView = new IndexView(options);
      App.container.show(indexView);
      Backbone.history.start();
      Communicator.mediator.trigger("APP:START");
    });

    App.addInitializer(function (options) {
      new PostRouter(options);
      Backbone.history.start();
    });

    return App;
  });