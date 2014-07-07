module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        libraries: [
          "js/jquery.easing.js",
          "js/jquery.tinynav.js",
          "js/jquery.tinyscrollbar.js",
          "js/imagesloaded.pkgd.js",
          "js/jquery.transit.js",
          "js/widgets/jquery.fullcalendar.js",
          "js/widgets/jquery.fullcalendar.gcal.js"
        ],
        custom: [
          "js/globals.js", 
          "js/alert.js",
          "js/weather.js",
          "js/thin-strip.js",
          "js/dropdowns.js",
          "js/dropdowns-accessibility.js",
          "js/sidebar-menu.js",
          "js/mobile-menu.js",
          "js/search-expanded.js",
          "js/gallery.js",
          "js/widgets/community-photos.js",
          "js/widgets/slideshow.js",
          "js/widgets/uw-calendar.js",
          "js/widgets/youtube-playlist.js"
        ],
        src: [ '<%= concat.dist.libraries %>', '<%= concat.dist.custom %>' ],
        dest: 'js/site.dev.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
      },
      dist: {
        files: {
          'js/site.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: [ 'Gruntfile.js', '<%= concat.dist.custom %>' ],
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
          title: 'Task Complete',
          message: 'JS uglified successfully'
        }
      }
    },
    less: {
        production: {
	        options: {
		        cleancss: true
			},
			files: {
				'style.css': 'less/style.less'
			}
		},
		development: {
			files: {
				'style.dev.css': 'less/style.less'
			}
		}	
	},
    watch: {
      js: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['default']
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less']
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

};
