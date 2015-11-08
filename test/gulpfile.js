var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var plumber = require('gulp-plumber');
var Reporter = require('./reporter');
var runSequence = require('run-sequence').use(gulp);
var sequence = require('../gulp/sequence').use(gulp);

var project = ts.createProject('test/tsconfig.json');

gulp.task('test:clean', function () {
    return gulp.src(['test/lib']).pipe(rimraf());
});

gulp.task('test:ts', function () {
    return project.src()
        .pipe(ts(project))
        .pipe(gulp.dest('test/build'));
});

gulp.task('test:jasmine', function (callback) {
    return gulp.src(['test/build/tests/**/*.js'])
        .pipe(jasmine({
            reporter: new Reporter({ log: gutil.log, color: true })
        }))
        //.on('end', function (err) {
        //    callback();
        //})
        ;
});

gulp.task('test:rebuild', function (callback) {
    sequence('test:clean', 'test:ts', 'test:jasmine', callback);
});
