/* global React */

import styles from './dropdown.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default React.createClass({
	propTypes: {
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		options: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				value: React.PropTypes.oneOfType([
					React.PropTypes.string,
					React.PropTypes.number
				]).isRequired,
				name: React.PropTypes.string,
				disabled: React.PropTypes.bool
			})
		),
		onChange: React.PropTypes.func,
		className: React.PropTypes.string
	},

	handleChange(e) {
		this.props.onChange(e.target.value);
	},

	render() {
		const { value, options, className } = this.props;

		const optionsElements = options.map(option => (
			<option value={option.value} key={option.value} disabled={option.disabled}>
				{ option.name || option.value }
			</option>
		));

		return (
			<select className={cx('select', className)} value={value || ''} onChange={this.handleChange}>
				{optionsElements}
			</select>
		);
	}
});
