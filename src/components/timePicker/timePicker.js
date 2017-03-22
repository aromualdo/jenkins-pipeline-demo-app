/* global React */

import Dropdown from '../dropdown/dropdown';
import moment from 'moment';
import styles from './timePicker.scss';
import classNames from 'classnames/bind';
import { timeStringFormat } from '../../constants';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		time: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func
	},

	getInitialState() {
		return this.convertMomentToState(this.props.time);
	},

	componentWillReceiveProps(nextProps) {
		const { time: oldTime } = this.props;
		const { time: newTime } = nextProps;
		if((!oldTime && newTime) || (oldTime && !oldTime.isSame(newTime))) {
			this.setState(this.convertMomentToState(newTime));
		}
	},

	convertMomentToState(time) {
		return {
			date: time.format('YYYY-MM-DD'),
			hour: time.format('h'),
			minute: time.format('mm'),
			ampm: time.format('A')
		};
	},

	handleChange() {
		const { onChange } = this.props;
		const { date, hour, minute, ampm } = this.state;
		onChange && onChange(moment(`${date} ${hour}:${minute} ${ampm}`, timeStringFormat));
	},

	handleHourChange(hour) {
		this.setState({ hour }, this.handleChange);
	},

	handleMinuteChange(minute) {
		this.setState({ minute }, this.handleChange);
	},

	handleAmPmChange(ampm) {
		this.setState({ ampm }, this.handleChange);
	},

	render() {
		const { hour, minute, ampm } = this.state;
		const hours = [ ...Array(12).keys() ].map(i => ({ value: i + 1 }));
		const minutes = [ ...Array(60).keys() ].map(i => {
			const prefixed = '0' + i;
			return { value: prefixed.substring(prefixed.length - 2) };
		});
		const ampms = [ 'AM', 'PM' ].map(i => ({ value: i }));

		return (
			<span>
				<Dropdown
					value={hour}
					options={hours}
					onChange={this.handleHourChange}
					className={cx('select')}
				/>
				<Dropdown
					value={minute}
					options={minutes}
					onChange={this.handleMinuteChange}
					className={cx('select')}
				/>
				<Dropdown
					value={ampm}
					options={ampms}
					onChange={this.handleAmPmChange}
					className={cx('select')}
				/>
			</span>
		);
	}
});
