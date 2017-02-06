'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
//var rename = require("gulp-rename");
 
gulp.task('clean', function () {
    return del([
      'dist/**/*.js',
      'dist/**/*.js.map',
      'dist/**/*.css',
      'release/**/*.*'
    ]);
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/src'));
});
 
gulp.task('sassdemo', function () {
  return gulp.src('./demo/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/demo'));
});
 