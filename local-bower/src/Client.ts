import * as http from "http";
import * as Types from "./Types";

export default class Client {
	constructor(public bower: Types.Bower) {
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
		} else if (this.localBower.url) {
			this.isUrlBased = true;
			this.download = this.downloadFromUrl;
		} else {
			throw new Error("path or url missing in local-bower configuration");
		}
	}
	
	private slam: string = "Lalleglad";
	
	private localBower: Types.LocalBowerConfig;
	private isFileBased: boolean;
	private isUrlBased: boolean;
	private download: (fileName: string) => string;

	public getPackages: () => string;

	private getPackagesFromFilesystem(): string {
		return "";
	}

	private downloadFromUrl(fileName: string) : string {
		return "";
	}

	private downloadFromFilesystem(fileName: string) : string {
		return "";
	}
}
