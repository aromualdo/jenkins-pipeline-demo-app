/* global React, describe, it */

import DatePicker from './datePicker';
import moment from 'moment';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<DatePicker/>', () => {
	function renderDatePicker(otherProps={}) {
		const props = Object.assign({
			date: null,
			onChange: () => {}
		}, otherProps);

		return shallow(<DatePicker {...props}/>);
	}

	it('should not have a default date if date is not provided', () => {
		const component = renderDatePicker();
		expect(component.props().selected).toBe(null);
	});

	it('should override date to prop if provided', () => {
		const date = moment('2011-02-03');
		const component = renderDatePicker({ date });
		expect(component.props().selected.isSame(date, 'day')).toBe(true);
	});

	it('should set the minimum date to today', () => {
		const now = moment();
		const date = moment('2011-02-03');
		const component = renderDatePicker({ date });
		expect(component.props().minDate.isSame(now, 'day')).toBe(true);
	});

	it('should call onChange prop when date changes', () => {
		const onChange = expect.createSpy();
		const date = moment('2011-02-03');
		const component = renderDatePicker({ onChange });
		component.simulate('change', date);
		expect(onChange).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalledWith(date);
	});

	it('should update state of component when a new prop is provided', () => {
		const newDate = moment('2011-02-03');
		const component = renderDatePicker({ date: null });
		component.setProps({ date: newDate });
		expect(component.props().selected.isSame(newDate, 'day')).toBe(true);
	});
});
