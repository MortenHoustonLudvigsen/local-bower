var gutil = require('gulp-util');

function sequence() {
	var gulp = this || require('gulp');
	var tasks = Array.prototype.slice.call(arguments);
	var callback = tasks.pop();
	var task;

	function runNext() {
		task = tasks.shift();
		if (task) {
			gulp.start(task);
		} else {
			finish();
		}
	}

	function finish(err) {
		gulp.removeListener('task_stop', onTaskEnd);
		gulp.removeListener('task_err', onError);
		callback(err);
	}

	function onTaskEnd(event) {
		if (event.task !== task) return;
		runNext();
	}

	function onError(event) {
		if (event.task !== task) return;
		finish(event.err);
	}

	gulp.on('task_stop', onTaskEnd);
	gulp.on('task_err', onError);

	runNext();
}

module.exports = sequence;
module.exports.use = function (gulp) {
	return sequence.bind(gulp);
};
