var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('watch:css', function () {
    gulp.src('css/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets'));
});
