'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var bowerrc = grunt.file.readJSON('.bowerrc'),
    config = {
      app: 'app',
      dist: 'dist',
      vendor: bowerrc.directory,
      node: 'node_modules'
    };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    browserify: {
      dist: {
        files: {
          'app/scripts.js': [
            'app/scripts/main.js'
          ],
        },
        options: {
          alias: {
            'jquery': './app/scripts/bower_components/jquery/dist/jquery.js',
            'lodash': './<%= config.vendor %>/lodash/lodash.js',
            'backbone': './<%= config.vendor %>/backbone/backbone.js',
            'handlebars': './<%= config.vendor %>/handlebars/handlebars.js'
          }
        }
      }
      //vendor: {
      //  files: {
      //    'app/vendor.js': [
      //      'app/scripts/bower_components/jquery/dist/jquery.js'
      //    ]
      //  }
      //src: ['jquery', 'lodash', 'backbone', 'handlebars'],
      //dest: 'app/scripts/vendor.js',
      //options: {
      //alias: {
      //'jquery': 'app/scripts/bower_components/jquery/dist/jquery.js'
      //'lodash': '/<%= config.vendor %>/lodash/lodash.js',
      //'backbone': '<%= config.vendor %>/backbone/backbone.js',
      //'handlebars': '<%= config.vendor %>/handlebars/handlebars.js'
      //}
      //}
      //}
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [
    'browserify:dist'
  ]);
};