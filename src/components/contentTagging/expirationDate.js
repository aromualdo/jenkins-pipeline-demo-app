/* global React */

import DatePicker from '../datePicker/datePicker';
import moment from 'moment';
import styles from './contentTagging.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		expirationDate: React.PropTypes.instanceOf(moment),
		setExpirationDate: React.PropTypes.func
	},

	render() {
		const { expirationDate, setExpirationDate } = this.props;
		return (
			<div className={cx('section')}>
				<div className={cx('section-header')}>Expiration Date:</div>
				<div className={cx('input-container')}>
					<DatePicker date={expirationDate} onChange={setExpirationDate}/>
				</div>
				<div className={cx('text--small')}>Leave blank if there's no expiration date</div>
			</div>
		);
	}
});
