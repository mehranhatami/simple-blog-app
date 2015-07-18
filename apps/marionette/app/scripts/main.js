require([
  'backbone',
  'app',
], function (Backbone, App) {
  'use strict';

  window.App = App;

  Backbone.history.start({
    pushState: true
  });

  $.getJSON('/posts')
    .then(function (data) {
      App.start({
        posts: data
      });
    })
    .fail(function (error) {
      console.error('Something wrong with the database!', error);
    });

  // App.start();
});