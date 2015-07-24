require([
  'backbone',
  'app',
  'collections/posts',
  'communicator'
], function (Backbone, App, Posts, Communicator) {
  'use strict';

  window.App = App;

  Communicator.mediator.on('APP:START', function(){
    console.log('Application just got started!');
  });

  Communicator.mediator.on('POST:CREATED', function(){
    console.log('A new post just got created!');
  });

  Communicator.mediator.on('COMMENT:CREATED', function(post, comment){
    console.log('A new comment just added:', post, comment);
  });

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