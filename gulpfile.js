'use strict';
 
var gulp = require('gulp');
var util = require('gulp-util');
var using = require('gulp-using')
var merge = require('merge2');
var sass = require('gulp-sass');
var nodeSass = require('node-sass');
var del = require('del');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var inlineTemplate = require('gulp-inline-ng2-template');
const changed = require('gulp-changed');

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
    'dist/**/*.ts',
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
  var tsResult = gulp.src('./dist/**/*.ts')
    //.pipe(using())
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return merge([
    tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest("./dist")),
    tsResult.dts.pipe(gulp.dest("./release"))
  ]);
});

gulp.task("tscm", function () {
  var tsResult = gulp.src(['./dist/**/*.ts', '!./dist/**/*.d.ts'])
    .pipe(changed("./dist", {extension: '.js'}))
    .pipe(using())
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return merge([
    tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest("./dist")),
    tsResult.dts.pipe(gulp.dest("./release"))
  ]);
});

gulp.task("inline", function () {
  return gulp.src('./+(src|demo)/**/*.ts')
    .pipe(inlineTemplate(inlineOptions))
    .pipe(gulp.dest("./dist"));
});

gulp.task("inlinem", function () {
  return gulp.src('./+(src|demo)/**/*.ts')
    .pipe(changed("./dist"))
    .pipe(inlineTemplate(inlineOptions))
    .pipe(gulp.dest("./dist"));
});

gulp.task('build', gulp.series('inline', 'tsc', function (done) {
  done();
}));

gulp.task('watch', function () {
    gulp.watch('./+(src|demo)/**/*.ts', gulp.series('inlinem', 'tscm'));
});



