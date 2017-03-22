/* global React, describe, it */

import { PlatformSelectionComponent as PlatformSelection } from './platformSelection';
import PlatformOption from './platformOption';
import { Platforms } from '../../constants';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<PlatformSelection/>', () => {
	function renderPlatformSelection(otherProps={}) {
		const props = Object.assign({
			platforms: {},
			setPlatformSelected: () => {}
		}, otherProps);

		return shallow(<PlatformSelection {...props}/>);
	}

	it('should render a <PlatformOption/> for each platform that is present', () => {
		const platforms = {
			[Platforms.facebook]: { selected: false },
			[Platforms.twitter]: { selected: false }
		};
		const platformSelection = renderPlatformSelection({ platforms });
		expect(platformSelection.find(PlatformOption).length).toBe(2);
	});
});
