/* global React, describe, it */

import Scheduler from './scheduler';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<Scheduler/>', () => {
	function renderScheduler(props={}) {
		return shallow(<Scheduler {...props} />);
	}

	it('should add an overflow:hidden style to the body when mounting, and set it back to the original styling when unmounted', () => {
		window.document.body.style._values.overflow = 'auto';
		const scheduler = renderScheduler({ actions: { resetPostSelections: f => f } });
		expect(window.document.body.style._values.overflow).toBe('hidden');
		scheduler.unmount();
		expect(window.document.body.style._values.overflow).toBe('auto');
	});

});
