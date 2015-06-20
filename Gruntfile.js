'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    dist: 'dist',
    vendor: '<%= bowerrc.directory %>',
    node: 'node_modules'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),

    config: config,

    browserify: {
      dist: {
        files: {
          'app/cjs.js': [
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/scripts/models/*.js',
            'app/scripts/routers/*.js',
            'app/scripts/views/*.js'
          ],
        },
        options: {}
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  
  grunt.registerTask('default', [
    'browserify:dist'
  ]);
};