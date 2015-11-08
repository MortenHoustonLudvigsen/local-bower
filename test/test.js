var util = require("util");
var localBower = require('local-bower');

function inspect(value) {
    return util.inspect(value, { depth: null });
}

var slam = localBower({});

slam.match('slambam');
slam.locate('slambam');
slam.releases('slambam');

