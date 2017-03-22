/* global React */

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		date: React.PropTypes.instanceOf(moment),
		onChange: React.PropTypes.func
	},

	getInitialState() {
		return { date: this.props.date };
	},

	componentWillReceiveProps(nextProps) {
		const { date: oldDate } = this.props;
		const { date: newDate } = nextProps;
		if((!oldDate && newDate) || (oldDate && !oldDate.isSame(newDate))) {
			this.setState({ date: newDate });
		}
	},

	handleChange(date) {
		this.setState({ date }, () => {
			const { onChange } = this.props;
			onChange && onChange(this.state.date);
		});
	},

	render() {
		const { date } = this.state;

		return (
			<DatePicker
				selected={date}
				minDate={moment()}
				onChange={this.handleChange}
				className={cx('date-picker')}
			/>
		);
	}
});
