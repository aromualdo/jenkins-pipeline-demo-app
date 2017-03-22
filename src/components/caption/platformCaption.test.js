/* global React, describe, it */

import PlatformCaption from './platformCaption';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Platforms } from '../../constants';
import styles from './caption.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function generateCaption(platform, captionLengthOver) {
	const maxChar = Platforms.getCharacterLimit(Platforms[platform]);
	const captionLength = captionLengthOver ? maxChar + 5 : maxChar - 5;

	return Array(captionLength).join('a');
}

describe('<PlatformCaption/>', () => {
	function renderPlatformCaption(otherProps={}) {
		const props = Object.assign({
			platform: null,
			caption: null,
			maxChar: null,
			handleChange: ()=>{}
		}, otherProps);

		return shallow(<PlatformCaption {...props}/>);
	}

	function testCharacterCountDisplay(platform, shouldBeShown) {
		it(`should ${shouldBeShown ? '' : 'not'} show the character count if platform is ${platform} and captionLength is ${shouldBeShown ? 'over' : 'under'} maxChar`, () => {
			const caption = generateCaption(platform, shouldBeShown);
			const maxChar = Platforms.getCharacterLimit(Platforms[platform]);
			const platformCaption = renderPlatformCaption({ platform, caption, maxChar });
			expect(platformCaption.find(`.${cx('textarea-count')}`).length).toBe(shouldBeShown ? 1 : 0);
		});
	}

	it('should render a caption header for twitter when provided twitter as a platform', () => {
		const platformCaption = renderPlatformCaption({ platform: Platforms.twitter });
		expect(platformCaption.find(`.${cx('caption-header')}`).text()).toBe('Twitter caption:');
	});

	it('should render the input with a value of the caption provided', () => {
		const caption = 'The quick brown fox attacked the lazy dog and ate its offspring.';
		const platformCaption = renderPlatformCaption({ caption });
		expect(platformCaption.find(`.${cx('textarea')}`).props().value).toBe(caption);
	});

	it('should call handleChange when the textarea has a change event', () => {
		const handleChange = expect.createSpy();
		const platformCaption = renderPlatformCaption({ handleChange });
		platformCaption.find('textarea').simulate('change', { target: {} });
		expect(handleChange).toHaveBeenCalled();
	});

	it('should show 76 remaining characters when a caption of 64 characters is provided and a maxChar of 140', () => {
		const platformCaption = renderPlatformCaption({
			platform: Platforms.twitter,
			maxChar: Platforms.getCharacterLimit(Platforms.twitter),
			caption: 'The quick brown fox attacked the lazy dog and ate its offspring.'
		});
		expect(platformCaption.find(`.${cx('textarea-count')}`).text()).toBe('76');
	});

	it('should show maxChar as remaining characters when no caption is provided and platform is twitter', () => {
		const platformCaption = renderPlatformCaption({
			platform: Platforms.twitter,
			maxChar: Platforms.getCharacterLimit(Platforms.twitter)
		});
		expect(platformCaption.find(`.${cx('textarea-count')}`).text()).toBe('140');
	});

	testCharacterCountDisplay(Platforms.facebook, true);
	testCharacterCountDisplay(Platforms.facebook, false);
	testCharacterCountDisplay(Platforms.instagram, true);
	testCharacterCountDisplay(Platforms.instagram, false);
});
