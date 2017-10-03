// Setup
require('events').EventEmitter.prototype._maxListeners = 100;

var gulp = require('gulp');

var plugins = {
    gutil: require('gulp-uglify'),
    uglify: require('gulp-uglify'),
    gutil: require('gulp-util'),
    plumber: require('gulp-plumber'),
    runSequence: require('run-sequence'),
    watch: require('gulp-watch')
};

var paths = {
    js: {
        src: './_src/js/',
        dest: './www/assets/js/',
    }
};

require('load-gulp-tasks')(gulp, {
    pattern: ['_gulp/**/*.js'],
    paths: paths
}, plugins);

gulp.task('default', function() {
    return plugins.runSequence(
        ['watch']
    );
});
