var Resolver_1 = require("./Resolver");
module.exports = function (bower) {
    console.log("local-bower: Create resolver");
    return new Resolver_1["default"](bower);
};
