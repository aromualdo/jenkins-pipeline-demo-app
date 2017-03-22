/* global React, describe, it */

import Dropdown from './dropdown';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<Dropdown/>', () => {
	const options = [ { value: 'a' }, { value: 'b' }, { value: 'c' } ];

	function renderDropdown(otherProps={}) {
		const props = Object.assign({
			value: null,
			options,
			onChange: () => {},
			className: null
		}, otherProps);

		return shallow(<Dropdown {...props}/>);
	}

	it('should render all options provided in order', () => {
		const component = renderDropdown();
		const renderedValues = component.find('option').map(option => option.props().value);
		expect(renderedValues).toEqual(options.map(option => option.value));
	});

	it('should add the disabled attribute to options when disabled is true', () => {
		const component = renderDropdown({ options: [ { value: 'a', disabled: true } ] });
		expect(component.find('option').props().disabled).toBe(true);
	});

	it('should render option name if provided, otherwise default to option value', () => {
		const component = renderDropdown({ options: [ { value: 'a' }, { value: 'b', name: 'Option B' } ] });
		const renderedNames = component.find('option').map(option => option.text());
		expect(renderedNames).toEqual([ 'a', 'Option B' ]);
	});

	it('should call onChange function when change event fires on select', () => {
		const onChange = expect.createSpy();
		const value = 'new value';
		const component = renderDropdown({ onChange });
		component.find('select').simulate('change', { target: { value } });
		expect(onChange).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalledWith(value);
	});

	it('should apply className as attribute on select element', () => {
		const className = 'my-class';
		const component = renderDropdown({ className });
		expect(component.find('select').hasClass(className)).toBe(true);
	});
});
