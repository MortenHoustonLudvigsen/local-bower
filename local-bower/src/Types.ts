import * as events from "events";

export interface LocalBowerConfig {
	path?: string;
	url?: string;
}

export interface BowerConfig {
	analytics: boolean,
	cwd: string,
	directory: string,
	registry: string | { search: string | string[]; register: string; publish: string; },
	"shorthand-resolver": string;
	proxy: string;
	"https-proxy": string,
	ca: any;
	color: boolean;
	timeout: number;
	storage: { packages: string; registry: string; links: string; };
	interactive: boolean;
	resolvers: string[];
	"local-bower": LocalBowerConfig;
}

export interface BowerLoggerPrompt {
	type: string;
	message: string;
	validate?: (value: string) => boolean | string;
}

export type BowerLoggerPrompts = BowerLoggerPrompt | BowerLoggerPrompt[];
export type BowerLoggerCallback = (err: any, answer: string) => void;

export interface BowerLogger extends events.EventEmitter {
	error(id: string, message: string, data?: any): void;
	conflict(id: string, message: string, data?: any): void;
	warn(id: string, message: string, data?: any): void;
	action(id: string, message: string, data?: any): void;
	info(id: string, message: string, data?: any): void;
	debug(id: string, message: string, data?: any): void;
	log(level: string, id: string, message: string, data?: any): void;
	prompt(prompts: BowerLoggerPrompts, callback: BowerLoggerCallback): void;
	pipe(logger: BowerLogger): events.EventEmitter;
	geminate(): BowerLogger;
	intercept(fn: (args: any) => void): BowerLogger;
}

export interface Bower {
	version: string;
	config: BowerConfig;
	logger: BowerLogger;
}

export interface Release {
	target: string;
	version: string;
}

export interface EndPoint {
	name: string;
	source: string;
	target: string;
}

export interface Cached {
	endpoint: EndPoint;
	release: string;
	releases: Release[];
	version: string;
	resolution: string;
}

