/* global React, describe, it */

import { BottomBarComponent } from './bottomBar';
import Button from '../button/button';
import expect from 'expect';
import { shallow } from 'enzyme';
import styles from './bottomBar.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

describe('<BottomBar/>', () => {
	function renderBottomBar(otherProps={}) {
		const props = Object.assign({
			resetPostSelections: () => {},
			submitNewPost: () => {}
		}, otherProps);

		return shallow(<BottomBarComponent {...props}/>);
	}

	it('should call resetPostSelections when cancel button clicked', () => {
		const resetPostSelections = expect.createSpy();
		const bottomBar = renderBottomBar({ resetPostSelections });
		bottomBar.find(`.${cx('text-action')}`).simulate('click', { target: {} });
		expect(resetPostSelections).toHaveBeenCalled();
	});

	it('should call submitNewPost when submit button is clicked', () => {
		const submitNewPost = expect.createSpy();
		const bottomBar = renderBottomBar({ submitNewPost });
		bottomBar.find(Button).simulate('click');
		expect(submitNewPost).toHaveBeenCalled();
	});

	it('should disable submit button if post is invalid', () => {
		const bottomBar = renderBottomBar({ isValidPost: false });
		expect(bottomBar.find(Button).props().disabled).toBe(true);
	});

	it('should set button to loading state if waitingForResponse', () => {
		const bottomBar = renderBottomBar({ waitingForResponse: true });
		expect(bottomBar.find(Button).props().isLoading).toBe(true);
	});
});
