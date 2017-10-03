module.exports = function (gulp, options, plugins) {

    gulp.task('watch', function(callback) {
        return plugins.runSequence(
            ['watch-js'],
            callback
        );
    });

    gulp.task('watch-js', function() {
        plugins.watch([
            options.paths.js.src + '**/*.js'
        ], {usePolling:true}, function() {
            gulp.start('js');
        });
    });
};
