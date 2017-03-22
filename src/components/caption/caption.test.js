/* global React, describe, it */

import { Caption } from './caption';
import PlatformCaption from './platformCaption';
import { Platforms } from '../../constants';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('<Caption/>', () => {
	function renderCaption(otherProps={}) {
		const props = Object.assign({
			captions: {},
			selectedPlatforms: [],
			setCaption: () => {},
			allPlatformsCaption: '',
			setAllPlatformsChecked: () => {},
			setAllPlatformsCaption: () => {}
		}, otherProps);

		return shallow(<Caption {...props}/>);
	}

	it('should only find 1 caption textarea if prop allPlatforms is `true`', () => {
		const caption = renderCaption({ captions: { allPlatforms: true } });
		expect(caption.find(PlatformCaption).length).toBe(1);
	});

	it('should render 2 textarea caption inputs when provided 2 selected platforms', () => {
		const caption = renderCaption({ selectedPlatforms: [ Platforms.twitter, Platforms.facebook ] });
		caption.setState({ allPlatforms: false });
		expect(caption.find(PlatformCaption).length).toBe(2);
	});

	it('should call handleCheckbox when the checkbox has a change event', () => {
		const caption = renderCaption();
		const spy = expect.spyOn(caption.instance(), 'handleCheckbox');
		caption.find('input').simulate('change', { target: {} });
		expect(spy).toHaveBeenCalled();
	});

	it('should call setAllPlatformsCaption with allPlatformsCaption value when checkbox is checked', () => {
		const setAllPlatformsCaption = expect.createSpy();
		const allPlatformsCaption = 'Cool tweet';
		const caption = renderCaption({ allPlatformsCaption, setAllPlatformsCaption });
		caption.find('input').simulate('change', { target: { checked: true } });
		expect(setAllPlatformsCaption).toHaveBeenCalledWith(allPlatformsCaption);
	});

	it('should not call setAllPlatformsCaption when checkbox is unchecked', () => {
		const setAllPlatformsCaption = expect.createSpy();
		const caption = renderCaption({ setAllPlatformsCaption });
		caption.find('input').simulate('change', { target: { checked: false } });
		expect(setAllPlatformsCaption).toNotHaveBeenCalled();
	});

	it('should call setAllPlatformsChecked when checkbox with value from change event', () => {
		const setAllPlatformsChecked = expect.createSpy();
		const caption = renderCaption({ setAllPlatformsChecked });
		const checked = false;
		caption.find('input').simulate('change', { target: { checked } });
		expect(setAllPlatformsChecked).toHaveBeenCalledWith(checked);
	});
});
