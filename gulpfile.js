var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var ts = require('gulp-typescript');
var merge = require('merge2');
var runSequence = require('run-sequence').use(gulp);
var sequence = require('./gulp/sequence').use(gulp);

require('./local-bower/gulpfile');
require('./test/gulpfile');

gulp.task('rebuild', function (callback) {
    sequence('local-bower:rebuild', 'test:rebuild', callback);
});

gulp.task('change:local-bower', function (callback) {
    sequence('local-bower:ts', 'test:ts', 'test:jasmine', function (err) {
        //if (err) gutil.log(err);
        callback();
    });
});

gulp.task('change:test', function (callback) {
    sequence('test:ts', 'test:jasmine', function (err) {
        //if (err) gutil.log(err);
        callback();
    });
});

gulp.task('watch', ['change:local-bower'], function (callback) {
    gulp.watch('local-bower/src/**/*', ['change:local-bower']);
    gulp.watch('test/tests/**/*', ['change:test']);
});

gulp.task('default', ['rebuild']);
