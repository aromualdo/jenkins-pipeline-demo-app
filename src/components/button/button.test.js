/* global describe, it, React */

import Button from './button';
import Loader from '../loader/loader';
import expect from 'expect';
import { mount } from 'enzyme';

function renderButton(otherProps={}) {
	const props = Object.assign({}, {
		label: 'Press me!',
		isFullWidth: false,
		imageTileButton: false
	}, otherProps);

	return mount(<Button {...props}/>);
}

describe('<Button/>', () => {
	it('should show Loader if button is loading', () => {
		const button = renderButton({ isLoading: true });
		expect(button.find(Loader).length).toBe(1);
	});

	it('should not show Loader if button is not loading', () => {
		const button = renderButton({ isLoading: false });
		expect(button.find(Loader).length).toBe(0);
	});

	it('should fire onClick function when element is clicked', () => {
		const onClick = expect.createSpy();
		const button = renderButton({ onClick });
		button.find('button').simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	it('should not fire onClick function if button is disabled when element is clicked', () => {
		const onClick = expect.createSpy();
		const button = renderButton({ onClick, disabled: true });
		button.find('button').simulate('click');
		expect(onClick).toNotHaveBeenCalled();
	});

	it('should not fire onClick function if button is loading when element is clicked', () => {
		const onClick = expect.createSpy();
		const button = renderButton({ onClick, isLoading: true });
		button.find('button').simulate('click');
		expect(onClick).toNotHaveBeenCalled();
	});
});
