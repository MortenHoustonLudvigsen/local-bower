var Client = (function () {
    function Client(bower) {
        this.bower = bower;
        this.slam = "Lalleglad";
        this.localBower = bower && bower.config["local-bower"];
        if (!this.localBower) {
            throw new Error("local-bower configuration missing from .bowerrc");
        }
        if (this.localBower.path && this.localBower.url) {
            throw new Error("a local-bower configuration with both path and url is not supported");
        }
        if (this.localBower.path) {
            this.isFileBased = true;
            this.download = this.downloadFromFilesystem;
        }
        else if (this.localBower.url) {
            this.isUrlBased = true;
            this.download = this.downloadFromUrl;
        }
        else {
            throw new Error("path or url missing in local-bower configuration");
        }
    }
    Client.prototype.getPackagesFromFilesystem = function () {
        return "";
    };
    Client.prototype.downloadFromUrl = function (fileName) {
        return "";
    };
    Client.prototype.downloadFromFilesystem = function (fileName) {
        return "";
    };
    return Client;
})();
exports.__esModule = true;
exports["default"] = Client;
