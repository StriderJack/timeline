var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('optimize', function () {
    return gulp.src('assets/js/controller.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./'));
});

gulp.task('wiredep', function () {
  gulp
  .src('./index.html')
  .pipe(wiredep({}))
  .pipe(gulp.dest('./'));
});
