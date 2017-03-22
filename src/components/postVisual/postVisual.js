/* global React */

import Group from '../group/group';
import styles from './postVisual.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const PostVisual = React.createClass({
	propTypes: {
		mediaUrl: React.PropTypes.string,
		handleRecraft: React.PropTypes.func
	},

	createSubtext() {
		const { mediaUrl, handleRecraft } = this.props;
		// visual-subtext-- modifying classes are used only for testing purposes
		const classes = cx('visual-subtext', 'text--body', {
			'visual-subtext--recraft': mediaUrl,
			'visual-subtext--text-only': !mediaUrl
		});

		const prelink = mediaUrl ? 'Need to make a visual edit?' : 'Don’t want a text-only post?';
		const link = mediaUrl ? 'Re-craft this visual »' : 'Add a visual »';

		return (
			<div className={classes}>
				{ prelink } <span className={cx('subtext-link')} onClick={handleRecraft}>{ link }</span>
			</div>
		);
	},

	render() {
		const { mediaUrl } = this.props;

		const textOnly = (
			<div className={cx('text-only-visual')}>
				This is a text-only post... no visual is included.
			</div>
		);

		return (
			<Group title="Post Visual">
				{ mediaUrl ? <img src={mediaUrl} className={cx('post-visual')}/> : textOnly }
				{ this.createSubtext() }
			</Group>
		);
	}
});

export default PostVisual;
