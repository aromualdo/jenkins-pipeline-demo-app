/* global React, describe, it */

import { ContentTaggingComponent } from './contentTagging';
import ExpirationDate from './expirationDate';
import SubType from './subType';
import { ContentTypes } from '../../constants';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<ContentTagging/>', () => {
	function renderContentType(otherProps={}) {
		const props = Object.assign({
			contentType: ContentTypes.a,
			subType: null,
			setContentType: () => {},
			setSubType: () => {}
		}, otherProps);

		return shallow(<ContentTaggingComponent {...props}/>);
	}

	it('should render ExpirationDate and SubType when contentType is A content', () => {
		const component = renderContentType({ contentType: ContentTypes.a });
		expect(component.find(ExpirationDate).length).toBe(1);
		expect(component.find(SubType).length).toBe(1);
	});


	it('should not render ExpirationDate or SubType when contentType is not A content', () => {
		const component = renderContentType({ contentType: ContentTypes.b });
		expect(component.find(ExpirationDate).length).toBe(0);
		expect(component.find(SubType).length).toBe(0);
	});
});
