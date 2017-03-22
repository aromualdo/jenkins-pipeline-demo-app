/* global React */

import { Platforms } from '../../constants';
import styles from './caption.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		platform: React.PropTypes.string,
		handleChange: React.PropTypes.func.isRequired,
		caption: React.PropTypes.string,
		maxChar: React.PropTypes.number
	},

	remainingChar() {
		const { maxChar, caption } = this.props;

		return caption ? maxChar - caption.length : maxChar;
	},

	isOverlength() {
		const { maxChar, caption } = this.props;

		return caption && caption.length > maxChar;
	},

	showRemainingChar() {
		const { platform } = this.props;

		return platform === Platforms.twitter || !platform || this.isOverlength();
	},

	render() {
		const { platform, handleChange, caption } = this.props;
		const header = platform && <div className={cx('caption-header')}>{Platforms.getDisplayName(platform)} caption:</div>;
		const textareaStyles = cx('textarea', {
			'textarea--error': this.isOverlength()
		});
		const countStyles = cx('textarea-count', {
			'textarea-count--error': this.isOverlength()
		});
		const charCount = this.showRemainingChar() && <div className={countStyles}>{this.remainingChar()}</div>;

		return (
			<div className={cx('caption-group')}>
				<div className={cx('caption-header-group')}>
					{ header }
					{ charCount }
				</div>
				<textarea className={textareaStyles} rows="3" value={caption || ''} onChange={e => handleChange(e.target.value)}/>
			</div>
		);
	}
});
