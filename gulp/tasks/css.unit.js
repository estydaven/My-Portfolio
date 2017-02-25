'use strict';

module.exports = function() {
    $.gulp.task('pxtorem', function() {
        return $.gulp.src('./source/style/*.*')
            .pipe(cssunit({
                type     :    'px-to-rem',
                rootSize :    16
            }))
            .pipe($.gulp.dest($.config.root + '/assets/css'));
    });
};