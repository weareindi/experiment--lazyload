module.exports = function (gulp, options, plugins) {
    gulp.task('js', function() {
        return gulp.src(options.paths.js.src + '**/*.js')
            .pipe(plugins.plumber(function (error) {
                plugins.gutil.log(error.message);
                this.emit('end');
            }))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(options.paths.js.dest));
    });
};
