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
          "js/uams.core.js",
          "js/uams.init.js",
          "js/uams.alert.js",
          "js/uams.searchtoggle.js",
          "js/uams.search.js",
          "js/uams.quicklinks.js",
          "js/uams.slideshow.js",
          "js/uams.youtube.js",
          "js/uams.vimeo.js",
          "js/uams.radio-checkbox.js",
          "js/uams.dropdowns.js",
          "js/uams.mobile-menu.js",
          "js/uams.accordion.js",
          "js/uams.select.js",
          "js/uams.images.js",
          "js/uams.player.js",
          "js/uams.social.js",
        ],
        components : [
          // todo: put just external components here for the uams.js we will give out
        ],
        src: [ 'js/uams.intro.js', '<%= concat.dist.libraries %>', '<%= concat.dist.theme %>', 'js/uams.outro.js' ],
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
          'uams.js': ['<%= concat.dist.dest %>']
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
        reporterOutput: "",
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
                        'uams.css': 'less/style.less'
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
