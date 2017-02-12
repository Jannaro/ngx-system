'use strict';
 
var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-sass');
var nodeSass = require('node-sass');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var inlineTemplate = require('gulp-inline-ng2-template');

var tsProject = ts.createProject("tsconfig.json"); 
const inlineOptions = {
  useRelativePaths: true,
  templateProcessor: processTemplate,
  styleProcessor: processStyle
};

function processTemplate(path, ext, file, cb) {
  try {
    cb(null, file);
  }
  catch (err) {
    cb(err);
  }
}
function processStyle(path, ext, file, cb) {
  try {
    if(ext == ".scss") {
      file = nodeSass.renderSync({data: file}).css;
    }
    cb(null, file);
  }
  catch (err) {
    cb(err);
  }
}

gulp.task('clean', function () {
  return del([
    'dist/**/*.js',
    'dist/**/*.js.map',
    'release/**/*.*'
  ]);
});

gulp.task('sass', function () {
  return gulp.src('./+(src|demo)/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task("tsc", function () {
  var tsResult = gulp.src('./+(src|demo)/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(inlineTemplate(inlineOptions))
    .pipe(tsProject());
  return [tsResult.dts.pipe(gulp.dest("./release")),
    tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest("./dist"))];
});

gulp.task('build', function (done) {
  return runSequence('tsc', done);
});
