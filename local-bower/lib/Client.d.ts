import * as Types from "./Types";
export default class Client {
    bower: Types.Bower;
    constructor(bower: Types.Bower);
    private slam;
    private localBower;
    private isFileBased;
    private isUrlBased;
    private download;
    getPackages: () => string;
    private getPackagesFromFilesystem();
    private downloadFromUrl(fileName);
    private downloadFromFilesystem(fileName);
}
