import * as Types from "./Types";
import Resolver from "./Resolver";

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
export = function(bower: Types.Bower) {
	console.log("local-bower: Create resolver");
	return new Resolver(bower);
};

