import * as localBower from 'local-bower';
import * as Types from 'local-bower/lib/Types';

describe("module", function() {
	describe("'local-bower'", function() {
		it("should be a function", function() {
			expect(typeof require('local-bower')).toBe('function');
		});
	});
	describe("'local-bower/lib/Types'", function() {
		it("should be an object", function() {
			expect(typeof require('local-bower/lib/Types')).toBe('object');
		});
	});
});

