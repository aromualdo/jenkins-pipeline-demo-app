/* global React */

import Group from '../group/group';
import DatePicker from '../datePicker/datePicker';
import TimePicker from '../timePicker/timePicker';
import { setPublishTimestamp } from '../../redux/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './publishDateAndTime.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const PublishDateAndTimeComponent = React.createClass({
	propTypes: {
		publishTimestamp: React.PropTypes.instanceOf(moment),
		setPublishTimestamp: React.PropTypes.func.isRequired
	},

	handleTimestampChange(newTimestamp) {
		this.props.setPublishTimestamp(newTimestamp);
	},

	render() {
		const { publishTimestamp } = this.props;

		return (
			<Group title="Publish Date & Time">
				<div className={cx('input-container')}>
					<span>
						<div className={cx('text--subheader')}>Date</div>
						<DatePicker date={publishTimestamp} onChange={this.handleTimestampChange}/>
					</span>
					<span>
						<div className={cx('text--subheader')}>Time</div>
						<TimePicker time={publishTimestamp} onChange={this.handleTimestampChange}/>
					</span>
				</div>
				<div className={cx('text--small')}>Note! Dates in the past will be queued for immediate publication.</div>
			</Group>
		);
	}
});

export default connect(
	(state) => ({
		publishTimestamp: moment(state.publishTimestamp)
	}),
	(dispatch) => ({
		setPublishTimestamp: momentTimestamp => dispatch(setPublishTimestamp(momentTimestamp.format()))
	})
)(PublishDateAndTimeComponent);
