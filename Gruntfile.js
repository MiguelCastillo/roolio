//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      test: {
        options: {
          port: 8932,
          hostname: 'localhost'
        }
      },
      keepalive: {
        options: {
          port: 8939,
          host: 'localhost',
          keepalive: true,
          livereload: 32020,
          open: 'http://localhost:8939/test/SpecRunner.html'
        }
      }
    },
    mocha: {
      test: {
        options: {
          log: true,
          logErrors: true,
          reporter: 'Spec',
          run: false,
          timeout: 10000,
          urls: ['http://localhost:8932/test/SpecRunner.html']
        }
      }
    },
    watch: {
      test: {
        files: ['test/**/*.js', 'dist/**/*.js', '*.js'],
        options: {
          livereload: 32020
        }
      }
    },
    concurrent: {
      test: {
        tasks: ['connect:keepalive', 'watch:test', 'pakit:dev'],
        options: {
          logConcurrentOutput : true
        }
      }
    },
    pakit: {
      build: {
        files: {
          'dist/index.js': ['src/index.js']
        },
        options: {
          umd: 'roolio'
        }
      },
      dev: {
        files: {
          'dist/index.js': ['src/index.js']
        },
        options: {
          watch: true,
          umd: 'roolio'
        }
      }
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        tagMessage: 'Version <%= version %>',
        commitMessage: 'Release v<%= version %>',
        afterBump: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-pakit');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['pakit:build']);
  grunt.registerTask('serve', ['concurrent:test']);
  grunt.registerTask('test', ['connect:test', 'mocha:test']);
};
