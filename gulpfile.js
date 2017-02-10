'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject("tsconfig.json"); 

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
 
 gulp.task('clean-old', function () {
    return del([
      'demo/**/*.js',
      'demo/**/*.js.map',
      'demo/**/*.css',
      'src/**/*.js',
      'src/**/*.js.map',
      'src/**/*.css'
    ]);
});

gulp.task("tsc", function () {
   var tsResult = gulp.src('./+(src|demo)/**/*.ts')
      .pipe(tsProject());
   return [tsResult.dts.pipe(gulp.dest("./release")),
      tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest("./dist"))];
});

gulp.task('build', function (done) {
    return runSequence('copyHtml', 'sass', 'tsc', done);
});
