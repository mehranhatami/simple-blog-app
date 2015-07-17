require([
    'app'
  ],
  function (App) {
    'use strict';

    $.getJSON('/posts')
      .then(function (data) {
        return {
          posts: data
        }
      })
      .then(App.start)
      .fail(function (error) {
        console.error('Something wrong with the database!', error);
      });
  });