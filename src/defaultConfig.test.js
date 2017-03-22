/* global describe, it */

import expect from 'expect';
import defaultConfig from './defaultConfig';

describe('DefaultConfig', () => {
	it('should have `stubApi` set to `false`', () => {
		expect(defaultConfig.stubApi).toBe(false);
	});
});
