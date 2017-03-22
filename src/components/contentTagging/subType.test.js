/* global React, describe, it */

import SubType from './subType';
import { SubTypes } from '../../constants';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<SubType/>', () => {
	function renderSubType(otherProps={}) {
		const props = Object.assign({
			subType: null,
			setSubType: () => {}
		}, otherProps);

		return shallow(<SubType {...props}/>);
	}

	it('should render all options unselected when no subType is provided', () => {
		const component = renderSubType();
		component.find('input').forEach(element =>
			expect(element.props().checked).toBe(false)
		);
	});

	it('should render the corresponding option as selected when a subType is provided', () => {
		const subType = SubTypes.standard;
		const component = renderSubType({ subType });
		const subTypeOption = component.find('input').find({ value: subType });
		expect(subTypeOption.props().checked).toBe(true);
	});

	it('should call setSubType when an option is selected', () => {
		const setSubType = expect.createSpy();
		const component = renderSubType({ setSubType });

		const value = SubTypes.standard;
		const subTypeOption = component.find('input').find({ value });
		subTypeOption.simulate('change', { target: { value } });
		expect(setSubType).toHaveBeenCalled();
	});
});
