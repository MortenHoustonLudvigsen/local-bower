import * as Types from "./Types";
export default class Resolver {
    bower: Types.Bower;
    constructor(bower: Types.Bower);
    match(source: string): boolean;
    locate(source: string): string;
    releases(source: string): Types.Release[];
    fetch(endpoint: Types.EndPoint, cached: Types.Cached): {
        tempPath: string;
        removeIgnores?: boolean;
        resolution?: any;
    };
}
