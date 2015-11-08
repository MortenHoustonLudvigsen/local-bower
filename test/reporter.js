var extend = require('extend');
var chalk = require('chalk');

var defaultOptions = {
	color: true,
	showStack: true,
	log: function (str) {
		var con = global.console || console;
		if (con && con.log && str && str.length) {
			con.log(str);
		}
	}
};

function elapsed(start, end) { return (end - start) / 1000; }
function isFailed(obj) { return obj.status === "failed"; }
function isSkipped(obj) { return obj.status === "pending"; }
function isDisabled(obj) { return obj.status === "disabled"; }

function normaliseOptions(options) {
	options = extend({}, defaultOptions, options);
	options.color = !!options.color;
	options.showStack = !!options.showStack;
	return options;
}

function Reporter(options) {
	this.options = normaliseOptions(options);

	this.indent_string = '  ';
	this.startTime;
	this.currentSuite = null;
	this.totalSpecsExecuted = 0;
	this.totalSpecsSkipped = 0;
	this.totalSpecsDisabled = 0;
	this.totalSpecsFailed = 0;
	this.totalSpecsDefined;
	// when use use fit; jasmine never calls suiteStarted / suiteDone; so make a fake one to use
	this.fakeFocusedSuite = {
		id: 'focused',
		description: 'focused specs',
		fullName: 'focused specs'
	};
	this.__suites = {};
	this.__specs = {};
}

Reporter.prototype.log = function (txt) {
	if (!this.options.color && typeof txt === 'string') {
		//txt = chalk.stripColor(txt);
	}
	this.options.log(txt);
};

Reporter.prototype.getSuite = function (suite) {
	this.__suites[suite.id] = extend(this.__suites[suite.id] || {}, suite);
	return this.__suites[suite.id];
};

Reporter.prototype.getSpec = function (spec) {
	this.__specs[spec.id] = extend(this.__specs[spec.id] || {}, spec);
	return this.__specs[spec.id];
};

Reporter.prototype.jasmineStarted = function (summary) {
	this.totalSpecsDefined = summary && summary.totalSpecsDefined || NaN;
	this.startTime = this.startTime = new Date();
	this.started = true;
};

Reporter.prototype.suiteStarted = function (suite) {
	suite = this.getSuite(suite);
	suite._specs = 0;
	suite._nestedSpecs = 0;
	suite._failures = 0;
	suite._nestedFailures = 0;
	suite._skipped = 0;
	suite._nestedSkipped = 0;
	suite._disabled = 0;
	suite._nestedDisabled = 0;
	suite._depth = this.currentSuite ? this.currentSuite._depth + 1 : 1;
	suite._parent = this.currentSuite;
	this.currentSuite = suite;
};

Reporter.prototype.specStarted = function (spec) {
	if (!this.currentSuite) {
		// focused spec (fit) -- suiteStarted was never called
		this.suiteStarted(this.fakeFocusedSuite);
	}
	spec = this.getSpec(spec);
	spec._suite = this.currentSuite;
	spec._depth = this.currentSuite._depth + 1;
	this.currentSuite._specs++;
};

Reporter.prototype.specDone = function (spec) {
	var failed = false;
	var skipped = false;
	var disabled = false;
	var resultText = chalk.green('Passed');

	spec = this.getSpec(spec);

	if (isSkipped(spec)) {
		skipped = true;
		spec._suite._skipped++;
		this.totalSpecsSkipped++;
		resultText = chalk.gray('Skipped');
	} else if (isFailed(spec)) {
		failed = true;
		spec._suite._failures++;
		this.totalSpecsFailed++;
		resultText = chalk.red('Failed');
	} else if (isDisabled(spec)) {
		disabled = true;
		spec._suite._disabled++;
		this.totalSpecsDisabled++;
		resultText = chalk.yellow('Disabled');
	}
	this.totalSpecsExecuted++;

	this.log(resultText + ' ' + spec.fullName);

	if (failed) {
		for (var i = 0; i < spec.failedExpectations.length; i++) {
			var failedExpectation = spec.failedExpectations[i];
			failedExpectation.message.split('\n').forEach(function (line) {
				this.log('    ' + line);
			}, this);
			if (this.showStack) {
				failedExpectation.stack.split('\n').forEach(function (line) {
					this.log('    ' + line);
				}, this);
			}
		}
	}
};

Reporter.prototype.suiteDone = function (suite) {
	suite = this.getSuite(suite);
	if (typeof suite._parent === 'undefined') {
		// disabled suite (xdescribe) -- suiteStarted was never called
		this.suiteStarted(suite);
	}
	if (suite._parent) {
		suite._parent._specs += suite._specs + suite._nestedSpecs;
		suite._parent._failures += suite._failures + suite._nestedFailures;
		suite._parent._skipped += suite._skipped + suite._nestedSkipped;
		suite._parent._disabled += suite._disabled + suite._nestedDisabled;

	}
	this.currentSuite = suite._parent;

	var total = suite._specs + suite._nestedSpecs;
	var failed = suite._failures + suite._nestedFailures;
	var skipped = suite._skipped + suite._nestedSkipped;
	var disabled = suite._disabled + suite._nestedDisabled;
	var passed = total - failed - skipped;
	var color = failed ? chalk.bold.red : chalk.bold.green;
	var str = passed + ' of ' + total + ' passed (' + skipped + ' skipped, ' + disabled + ' disabled)';

	//this.log(color(str));
		
	//log(indentWithLevel(suite._depth, inColor(str + '.', color)));
};

Reporter.prototype.jasmineDone = function () {
	if (this.currentSuite) {
		// focused spec (fit) -- suiteDone was never called
		this.suiteDone(this.fakeFocusedSuite);
	}
	var now = new Date();
	var dur = elapsed(this.startTime, now);
	var total = this.totalSpecsDefined || this.totalSpecsExecuted;
	var disabled = total - this.totalSpecsExecuted + this.totalSpecsDisabled;
	var skipped = this.totalSpecsSkipped;
	var spec_str = total + (total === 1 ? " spec, " : " specs, ");
	var fail_str = this.totalSpecsFailed + (this.totalSpecsFailed === 1 ? " failure, " : " failures, ");
	var skip_str = skipped + " skipped, ";
	var disabled_str = disabled + " disabled in ";
	var summary_str = spec_str + fail_str + skip_str + disabled_str + dur + "s.";
	var result_str = (this.totalSpecsFailed && "FAILURE: " || "SUCCESS: ") + summary_str;
	var color = this.totalSpecsFailed ? chalk.bold.red : chalk.bold.green;

	this.log(color(result_str));

	//log(inColor(result_str, result_color));
	//log("Specs skipped but not reported (entire suite skipped or targeted to specific specs)", totalSpecsDefined - totalSpecsExecuted + totalSpecsDisabled);

	this.finished = true;
	// this is so phantomjs-testrunner.js can tell if we're done executing
	this.endTime = now;
};


module.exports = Reporter;
