var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var ts = require('gulp-typescript');
var merge = require('merge2');
var runSequence = require('run-sequence').use(gulp);
var sequence = require('../gulp/sequence').use(gulp);

var project = ts.createProject('local-bower/src/tsconfig.json');

gulp.task('local-bower:clean', function () {
    return gulp.src(['local-bower/lib']).pipe(rimraf());
});

gulp.task('local-bower:ts', function () {
    var results = project.src()
        .pipe(ts(project));

    return merge(results.js, results.dts)
        .pipe(gulp.dest('local-bower/lib'));
});

gulp.task('local-bower:rebuild', function (callback) {
    sequence('local-bower:clean', 'local-bower:ts', callback);
});
