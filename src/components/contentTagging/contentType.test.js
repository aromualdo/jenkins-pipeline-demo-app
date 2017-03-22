/* global React, describe, it */

import ContentType from './contentType';
import Dropdown from '../dropdown/dropdown';
import { ContentTypes } from '../../constants';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<ContentType/>', () => {
	function renderContentType(otherProps={}) {
		const props = Object.assign({
			contentType: ContentTypes.a,
			setContentType: () => {}
		}, otherProps);

		return shallow(<ContentType {...props}/>);
	}

	it('should render the corresponding option as selected based on the contentType provided', () => {
		const contentType = ContentTypes.a;
		const component = renderContentType({ contentType });
		expect(component.find(Dropdown).props().value).toBe(contentType);
	});

	it('should call setContentType when an option is selected', () => {
		const setContentType = expect.createSpy();
		const component = renderContentType({ setContentType });

		const value = ContentTypes.b;
		component.find(Dropdown).simulate('change', value);
		expect(setContentType).toHaveBeenCalled();
	});
});
