/* global React, describe, it */

import TimePicker from './timePicker';
import Dropdown from '../dropdown/dropdown';
import { timeStringFormat } from '../../constants';
import moment from 'moment';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<TimePicker/>', () => {
	const time = moment('2017-03-09 3:45 AM', timeStringFormat);

	function renderTimePicker(otherProps={}) {
		const props = Object.assign({
			time,
			onChange: () => {}
		}, otherProps);

		return shallow(<TimePicker {...props}/>);
	}

	it('should call onChange when the user selects a new hour', () => {
		const onChange = expect.createSpy();
		const hour = 12;
		const component = renderTimePicker({ onChange });
		component.find(Dropdown).first().simulate('change', hour);
		expect(onChange).toHaveBeenCalledWith(moment('2017-03-09 12:45 AM', timeStringFormat));
	});

	it('should call onChange when the user selects a new minute', () => {
		const onChange = expect.createSpy();
		const minute = 12;
		const component = renderTimePicker({ onChange });
		component.find(Dropdown).at(1).simulate('change', minute);
		expect(onChange).toHaveBeenCalledWith(moment('2017-03-09 3:12 AM', timeStringFormat));
	});

	it('should call onChange when the user selects a new AM/PM', () => {
		const onChange = expect.createSpy();
		const ampm = 'PM';
		const component = renderTimePicker({ onChange });
		component.find(Dropdown).last().simulate('change', ampm);
		expect(onChange).toHaveBeenCalledWith(moment('2017-03-09 3:45 PM', timeStringFormat));
	});

	it('should update state of component when a new prop is provided', () => {
		const newTime = moment('2017-03-09 12:45 PM', timeStringFormat);
		const component = renderTimePicker();
		component.setProps({ time: newTime });
		expect(component.find(Dropdown).first().props().value).toBe('12');
		expect(component.find(Dropdown).at(1).props().value).toBe('45');
		expect(component.find(Dropdown).last().props().value).toBe('PM');
	});
});
