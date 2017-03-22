/* global React, describe, it */

import PlatformOption from './platformOption';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Platforms } from '../../constants';
import styles from './platformOption.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

describe('<PlatformOption/>', () => {
	function renderPlatformOption(otherProps={}) {
		const props = Object.assign({
			platform: Platforms.twitter,
			remainingQuota: null,
			selected: false,
			handlePlatformSelection: () => {}
		}, otherProps);

		return shallow(<PlatformOption {...props}/>);
	}

	it('should render a quota message if remainingQuota is a number', () => {
		const platformOption = renderPlatformOption({ remainingQuota: 5 });
		expect(platformOption.find(`.${cx('quota')}`).length).toBe(1);
	});

	it('should not render a quota message if remainingQuota is not a number', () => {
		const platformOption = renderPlatformOption({ remainingQuota: null });
		expect(platformOption.find(`.${cx('quota')}`).length).toBe(0);
	});

	it('should mark the input element as checked if selected is true', () => {
		const platformOption = renderPlatformOption({ selected: true });
		expect(platformOption.find('input').props().checked).toBe(true);
	});

	it('should mark the input element as unchecked if selected is false', () => {
		const platformOption = renderPlatformOption({ selected: false });
		expect(platformOption.find('input').props().checked).toBe(false);
	});

	it('should call handlePlatformSelection when the input element has a change event', () => {
		const handlePlatformSelection = expect.createSpy();
		const platformOption = renderPlatformOption({ handlePlatformSelection });
		platformOption.find('input').simulate('change', { target: {} });
		expect(handlePlatformSelection).toHaveBeenCalled();
	});
});
