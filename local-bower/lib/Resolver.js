var util = require("util");
function inspect(value) {
    return util.inspect(value, { depth: null });
}
function logFn(name, args) {
    var argsArr = Array.prototype.slice.call(args);
    console.log(name + '(' + argsArr.map(function (a) { return inspect(a); }).join(', ') + ')');
}
var Resolver = (function () {
    function Resolver(bower) {
        this.bower = bower;
        // this.client = new Client(bower);
    }
    // private client: Client;
    // Match method tells whether resolver supports given source
    // It can return either boolean or promise of boolean
    Resolver.prototype.match = function (source) {
        logFn('match', arguments);
        if (source === 'slambam') {
            return true;
        }
        return source.indexOf('local-bower://') === 0;
        return false;
    };
    // Optional:
    // Can resolve or normalize sources, like:
    // "jquery" => "git://github.com/jquery/jquery.git"
    Resolver.prototype.locate = function (source) {
        logFn('locate', arguments);
        return source;
    };
    // Optional:
    // Allows to list available versions of given source.
    // Bower chooses matching release and passes it to "fetch"
    Resolver.prototype.releases = function (source) {
        logFn('releases', arguments);
        return [
            { target: 'v1.0.0', version: '1.0.0' },
            { target: 'v1.0.1', version: '1.0.1' }
        ];
    };
    // It downloads package and extracts it to temporary directory
    // You can use npm's "tmp" package to tmp directories
    // See the "Resolver API" section for details on this method
    Resolver.prototype.fetch = function (endpoint, cached) {
        logFn('fetch', arguments);
        return undefined;
        // var tempDir = tmp.dirSync();
        // // If cached version of package exists, re-use it
        // if (cached && cached.version) {
        // 	return;
        // }
        // ... download package to tempDir
        // return {
        // 	tempPath: tempDir.name,
        // 	removeIgnores: true
        // }
    };
    return Resolver;
})();
exports.__esModule = true;
exports["default"] = Resolver;
