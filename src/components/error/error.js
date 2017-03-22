/* global React */

import styles from './error.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		message: React.PropTypes.string.isRequired
	},

	render() {
		const { message } = this.props;

		return (
			<div className={cx('error')}>
				<div className={cx('icon')}></div>
				{message}
			</div>
		);
	}
});
