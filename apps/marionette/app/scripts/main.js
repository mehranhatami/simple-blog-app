require([
  'backbone',
  'app',
  'collections/posts',
], function (Backbone, App, Posts) {
  'use strict';

  window.App = App;

  $.getJSON('/posts')
    .then(function (data) {
      App.start({
        posts: new Posts(data)
      });
    })
    .fail(function (error) {
      console.error('Something wrong with the database!', error);
    });
});