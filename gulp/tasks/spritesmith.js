'use strict';

module.exports = function() {
    $.gulp.task('spritesmith', function() {
        return $.gulp.src('./source/images/sprite/*.*')
                .pipe($.gp.spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.css',
                }))

        .pipe($.gulp.dest('./build/images/'))
        .pipe($.gulp.dest('./build/css/'));
    });
};
