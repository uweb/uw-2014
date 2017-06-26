module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        libraries: [
          "js/libraries/jquery.easing.js",
          "js/libraries/jquery.tinyscrollbar.js",
          "js/libraries/video.dev.js",
          "js/libraries/imagesloaded.pkgd.js",
          "js/libraries/jetpack.carousel.js",
          "js/libraries/prettify.js",
        ],
        theme : [
          "js/uw.core.js",
          "js/uw.init.js",
          "js/uw.alert.js",
          "js/uw.searchtoggle.js",
          "js/uw.search.js",
          "js/uw.quicklinks.js",
          "js/uw.slideshow.js",
          "js/uw.youtube.js",
          "js/uw.vimeo.js",
          "js/uw.radio-checkbox.js",
          "js/uw.dropdowns.js",
          "js/uw.mobile-menu.js",
          "js/uw.mobile-sidebar-menu.js",
          "js/uw.accordion.js",
          "js/uw.select.js",
          "js/uw.images.js",
          "js/uw.player.js",
          "js/uw.social.js",
          "js/uw.custom-link.js"
        ],
        components : [
          // todo: put just external components here for the uw.js we will give out
        ],
        src: [ 'js/uw.intro.js', '<%= concat.dist.libraries %>', '<%= concat.dist.theme %>', 'js/uw.outro.js' ],
        dest: 'js/site.dev.js'
      }
    },
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
      },
      dist: {
        files: {
          'js/site.js': ['<%= concat.dist.dest %>'],
          'uw.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: [ 'gruntfile.js', '<%= concat.dist.theme %>' ],
      options: {
        asi: true,
        smarttabs: true,
        laxcomma: true,
        lastsemic: true,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    notify: {
      watch: {
        options: {
          title: 'Dun\' Grunted',
          message: 'All is good'
        }
      }
    },
    less: {
        production: {
	        options: {
		        cleancss: true
			},
			files: {
				'style.css': 'less/style.less',
                        'uw.css': 'less/style.less'
			}
		},
		development: {
			files: {
				'style.dev.css': 'less/style.less'
			}
		}
    },
    watch: {
      config : {
        files : ['gruntfile.js'],
        options : {
          reload: true
        }
      },
      js: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['js']
      },
      css: {
        files: ['less/*.less', 'less/flat/*.less', 'less/bootstrap/*.less', 'less/widgets/*.less'],
        tasks: ['css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'notify', 'less']);
  grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'notify' ]);
  grunt.registerTask( 'css', ['less', 'notify'] );

};
