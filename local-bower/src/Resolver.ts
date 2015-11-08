import * as util from "util";
import * as tmp from "tmp";
import * as Types from "./Types";
import Client from "./Client";

function inspect(value: any): string {
	return util.inspect(value, { depth: null });
}

function logFn(name: string, args: IArguments): void {
	let argsArr: any[] = Array.prototype.slice.call(args);
	console.log(name + '(' + argsArr.map(a => inspect(a)).join(', ') + ')');
}

export default class Resolver {
	constructor(public bower: Types.Bower) {
		// this.client = new Client(bower);
	}

	// private client: Client;
	
	// Match method tells whether resolver supports given source
	// It can return either boolean or promise of boolean
	match(source: string): boolean {
		logFn('match', arguments);
		if (source === 'slambam') {
			return true;
		}
		return source.indexOf('local-bower://') === 0
		return false;
	}

	// Optional:
	// Can resolve or normalize sources, like:
	// "jquery" => "git://github.com/jquery/jquery.git"
	locate(source: string): string {
		logFn('locate', arguments);
		return source;
	}

	// Optional:
	// Allows to list available versions of given source.
	// Bower chooses matching release and passes it to "fetch"
	releases(source: string): Types.Release[] {
		logFn('releases', arguments);
		return [
			{ target: 'v1.0.0', version: '1.0.0' },
			{ target: 'v1.0.1', version: '1.0.1' }
		]
	}

	// It downloads package and extracts it to temporary directory
	// You can use npm's "tmp" package to tmp directories
	// See the "Resolver API" section for details on this method
	fetch(endpoint: Types.EndPoint, cached: Types.Cached): { tempPath: string; removeIgnores?: boolean; resolution?: any } {
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
	}
}
