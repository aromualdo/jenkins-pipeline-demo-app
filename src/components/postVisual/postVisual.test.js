/* global React, describe, it */

import PostVisual from './postVisual';
import expect from 'expect';
import { shallow } from 'enzyme';
import styles from './postVisual.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

describe('<PostVisual/>', () => {
	function renderPostVisual(otherProps={}) {
		const props = Object.assign({
			mediaUrl: null,
			handleRecraft: () => {}
		}, otherProps);

		return shallow(<PostVisual {...props}/>);
	}

	it('should not render an image if a mediaUrl is not provided and instead render a text-only-visual area', () => {
		const postVisual = renderPostVisual();
		expect(postVisual.find(`.${cx('text-only-visual')}`).length).toBe(1);
		expect(postVisual.find(`.${cx('post-visual')}`).length).toBe(0);
	});

	it('should render an image if a mediaUrl is provided', () => {
		const postVisual = renderPostVisual({ mediaUrl: 'https://placekitten.com/g/640/640' });
		expect(postVisual.find(`.${cx('text-only-visual')}`).length).toBe(0);
		expect(postVisual.find(`.${cx('post-visual')}`).length).toBe(1);
	});

	it('should render `visual-subtext--recraft` text if a mediaUrl is provided', () => {
		const postVisual = renderPostVisual({ mediaUrl: 'https://placekitten.com/g/640/640' });
		expect(postVisual.find(`.${cx('visual-subtext--recraft')}`).length).toBe(1);
	});

	it('should render `visual-subtext--text-only` text if a mediaUrl is not provided', () => {
		const postVisual = renderPostVisual();
		expect(postVisual.find(`.${cx('visual-subtext--text-only')}`).length).toBe(1);
	});

	it('should call handleRecraft when the subtext link is clicked', () => {
		const handleRecraft = expect.createSpy();
		const postVisual = renderPostVisual({ mediaUrl: 'https://placekitten.com/g/640/640', handleRecraft });
		postVisual.find(`.${cx('subtext-link')}`).simulate('click');
		expect(handleRecraft).toHaveBeenCalled();
	});
});
