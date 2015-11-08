var through = require('through2');
var gutil = require('gulp-util');

module.exports = function filelog(prefix) {
	prefix = prefix ? prefix + ' ' : '';
	
	function handleFile(file, enc, callback) {
		gutil.log(prefix + file.relative);
		return callback(null, file);
	}

	return through.obj(handleFile);
};
