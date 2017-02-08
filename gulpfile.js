'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
 
gulp.task('clean', function () {
    return del([
      'dist/**/*.js',
      'dist/**/*.js.map',
      'dist/**/*.css',
      'release/**/*.*'
    ]);
});

gulp.task('copyHtml', function () {
  return gulp.src('./demo/**/*.html')
    .pipe(gulp.dest('./dist/demo'));
});
 
gulp.task('sass', function () {
  return gulp.src('./+(src|demo)/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('build', function (done) {
    return runSequence('copyHtml', 'sass', done);
});
