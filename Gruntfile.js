(function() { 'use strict';

	module.exports = function(grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),

			concat: {
				options: {
					separator: ';',
					stripBanners: { block: true, line: true },
				},

				src: {
					dest: 'angular-maps.js',
					src: [
						'lib/OpenLayers-build.js',

						'src/module.js',

						'src/factories/module.js',
						'src/factories/mapFactory.js',

						'src/services/module.js',
						'src/services/mapsService.js'
					]
				}
			},

			concat_css: {
				options: {},
				app: {
					dest: 'angular-maps.css',
					src: ['src/css/angular-maps.css']
				}
		  },

		  cssmin: {
		  	target: {
			    files: {
			      'angular-maps.min.css': ['angular-maps.css']
			    }
			  }
		  },

			uglify: {
				lib: {
					options: { mangle: false },
					files: { 'angular-maps.min.js': ['angular-maps.js'] }
				}
			},

			jsdoc: {
				dist: {
					src: ['src/**/*.js', 'README.md'],
					options: {
						private: false,
						destination: 'doc',
						configure: 'jsdoc.json',
						template: 'node_modules/jsdoc-oblivion/template/'
					}
				}
			},

			jshint: {
				all: ['Gruntfile.js', 'src/**/*.js']
			},

			watch: {
				min: {
					files: ['Gruntfile.js', 'src/**/*.js', 'jsdoc.json', 'README.md'],
					tasks: ['concat:src', 'concat_css', 'jshint', 'jsdoc'],
					options: {
						atBegin: true
					}
				}
			}
		});

		grunt.registerTask('default', ['concat', 'concat_css', 'cssmin', 'jsdoc', 'uglify']);

		require('time-grunt')(grunt);
		require('jit-grunt')(grunt);
	};

})();


