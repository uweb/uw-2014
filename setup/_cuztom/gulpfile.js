// Modules
var gulp    = require('gulp'),
    less    = require('gulp-less'),
    concat  = require('gulp-concat'),
    minify  = require('gulp-cssnano'),
    uglify  = require('gulp-uglify'),
    merge   = require('merge2'),
    wrap    = require("gulp-wrap");

// Vars
var basePath = 'src/Gizburdt/Cuztom/Assets';

// Styles
gulp.task('styles', function() {
    cssFiles = [
        basePath + '/vendor/datetimepicker/jquery.datetimepicker.css',
        basePath + '/less/cuztom.less'
    ];

    gulp.src(cssFiles)
        .pipe(less())
        .pipe(minify())
        .pipe(concat('cuztom.min.css'))
        .pipe(gulp.dest(basePath + '/dist/css'));
});

// Scripts
gulp.task('scripts', function() {
    var mergeFiles = [
        basePath + '/js/cuztom.js',
        basePath + '/js/cuztom-ui.js',
        basePath + '/js/cuztom-sortable.js',
        basePath + '/js/cuztom-media.js',
        basePath + '/js/cuztom-ajax.js',
    ];

    vueFiles = [
        basePath + '/vendor/vue/dist/vue.js'
    ];

    gulp.src(mergeFiles)
        .pipe(uglify())
        .pipe(concat('cuztom.min.js'))
        .pipe(wrap(('jQuery.noConflict(); jQuery(function($) { var doc = $(document); <%= contents %> });')))
        .pipe(gulp.dest(basePath + '/dist/js'));

    // Datepicker
    gulp.src(basePath + '/vendor/datetimepicker/build/jquery.datetimepicker.full.js')
        .pipe(uglify())
        .pipe(concat('datetimepicker.min.js'))
        .pipe(gulp.dest(basePath + '/dist/js'));

    // Vue
    gulp.src(vueFiles)
        .pipe(uglify())
        .pipe(concat('cuztom-vue.min.js'))
        .pipe(gulp.dest(basePath + '/dist/js'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(basePath + '/less/**/*.less', ['styles']);
    gulp.watch(basePath + '/js/**/*.js', ['scripts']);
});

// Default
gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});
